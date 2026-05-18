import "server-only"

import tls from "node:tls"

type MailInput = {
  to: string
  subject: string
  text: string
}

function waitFor(socket: tls.TLSSocket, expected: number[]) {
  return new Promise<string>((resolve, reject) => {
    const onData = (chunk: Buffer) => {
      const message = chunk.toString("utf8")
      const code = Number(message.slice(0, 3))

      if (expected.includes(code)) {
        cleanup()
        resolve(message)
      } else if (code >= 400) {
        cleanup()
        reject(new Error(message))
      }
    }
    const onError = (error: Error) => {
      cleanup()
      reject(error)
    }
    const cleanup = () => {
      socket.off("data", onData)
      socket.off("error", onError)
    }

    socket.on("data", onData)
    socket.on("error", onError)
  })
}

async function command(socket: tls.TLSSocket, line: string, expected: number[]) {
  socket.write(`${line}\r\n`)
  return waitFor(socket, expected)
}

export async function sendCrmMail(input: MailInput) {
  const host = process.env.CRM_SMTP_HOST ?? "mail.ekvator360.com.tr"
  const port = Number(process.env.CRM_SMTP_PORT ?? 465)
  const user = process.env.CRM_SMTP_USER ?? "crm@ekvator360.com.tr"
  const password = process.env.CRM_SMTP_PASSWORD

  if (!password) {
    throw new Error("CRM_SMTP_PASSWORD is missing")
  }

  const socket = tls.connect({ host, port, servername: host })

  await new Promise<void>((resolve, reject) => {
    socket.once("secureConnect", resolve)
    socket.once("error", reject)
  })

  await waitFor(socket, [220])
  await command(socket, `EHLO ${host}`, [250])
  await command(socket, "AUTH LOGIN", [334])
  await command(socket, Buffer.from(user).toString("base64"), [334])
  await command(socket, Buffer.from(password).toString("base64"), [235])
  await command(socket, `MAIL FROM:<${user}>`, [250])
  await command(socket, `RCPT TO:<${input.to}>`, [250, 251])
  await command(socket, "DATA", [354])

  const body = [
    `From: Ekvator360 CRM <${user}>`,
    `To: ${input.to}`,
    `Subject: ${input.subject}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "",
    input.text,
    ".",
  ].join("\r\n")

  socket.write(`${body}\r\n`)
  await waitFor(socket, [250])
  await command(socket, "QUIT", [221])
  socket.end()
}
