export function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  defaultValue,
}: {
  label: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
  defaultValue?: string | number
}) {
  return (
    <label className="grid gap-1.5 text-sm font-medium">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="h-10 rounded-lg border bg-background px-3 text-sm outline-none transition focus:border-[var(--brand)] focus:ring-3 focus:ring-[var(--brand)]/10"
      />
    </label>
  )
}

export function SelectField({
  label,
  name,
  children,
  defaultValue,
}: {
  label: string
  name: string
  children: React.ReactNode
  defaultValue?: string
}) {
  return (
    <label className="grid gap-1.5 text-sm font-medium">
      {label}
      <select
        name={name}
        defaultValue={defaultValue}
        className="h-10 rounded-lg border bg-background px-3 text-sm outline-none transition focus:border-[var(--brand)] focus:ring-3 focus:ring-[var(--brand)]/10"
      >
        {children}
      </select>
    </label>
  )
}
