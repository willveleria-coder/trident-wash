import { redirect } from 'next/navigation'

// The old admin moved to Trident CRM.
export default function Admin() {
  redirect('https://trident-crm-ruddy.vercel.app/dashboard')
}
