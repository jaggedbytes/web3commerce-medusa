import ChevronDown from "@modules/common/icons/chevron-down"
import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/router"
import { MEDUSA_BACKEND_URL } from "@lib/config"

const AccountNav = () => {
  const { route } = useRouter()
  const router = useRouter()

  function onClick(e: any) {
    e.preventDefault()
    fetch(MEDUSA_BACKEND_URL + '/store/auth', {
      method: 'delete',
      credentials: 'include'
    })
      .then(() => {
        alert("Logged out successfully")
        router.reload()
      })
      .catch((e) => {
        console.error(e)
        alert("An error occurred")
      })
  }

  return (
    <div>
      <div className="small:hidden">
        {route !== "/account" && (
          <Link href="/account">
            <a className="flex items-center gap-x-2 text-small-regular py-2">
              <ChevronDown className="transform rotate-90" />
              <span>Account</span>
            </a>
          </Link>
        )}
      </div>
      <div className="hidden small:block">
        <div>
          <div className="py-4">
            <h3 className="text-base-semi">Account</h3>
          </div>
          <div className="text-base-regular">
            <ul className="flex mb-0 justify-start items-start flex-col gap-y-4">
              <li>
                <AccountNavLink href="/account" route={route}>
                  Overview
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink href="/account/profile" route={route}>
                  Profile
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink href="/account/addresses" route={route}>
                  Addresses
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink href="/account/orders" route={route}>
                  Orders
                </AccountNavLink>
              </li>
              <li>
                <button className="text-gray-700" onClick={onClick}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

type AccountNavLinkProps = {
  href: string
  route: string
  children: React.ReactNode
}

const AccountNavLink = ({ href, route, children }: AccountNavLinkProps) => {
  const active = route === href
  return (
    <Link href={href}>
      <a
        className={clsx("text-gray-700", {
          "text-gray-900 font-semibold": active,
        })}
      >
        {children}
      </a>
    </Link>
  )
}

export default AccountNav
