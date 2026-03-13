import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { signOutUser } from "@/lib/actions/action-users";
import { EllipsisVertical } from "lucide-react";

export default async function UserButton({
  mobile = false,
}: {
  mobile?: boolean;
}) {
  const session = await auth();
  const cls = mobile ? "flex" : "hidden md:flex";

  if (!session)
    return (
      <Link href="/sign-in">
        <Button
          variant="ghost"
          className={`
            ${cls}
            font-semibold
            text-[#5f7d5a]
            hover:bg-gradient-to-r hover:from-[#f0f4ee] hover:to-[#e8ede6]
            transition-all duration-300
            rounded-full px-4
          `}
        >
          Sign In
        </Button>
      </Link>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`
            ${cls}
            gap-2 font-semibold capitalize
            text-[#5f7d5a]
            hover:bg-gradient-to-r hover:from-[#f0f4ee] hover:to-[#e8ede6]
            transition-all duration-300
            rounded-full px-4
            group
          `}
        >
          {session.user?.name || "Account"}
          <EllipsisVertical
            size={18}
            className="md:group-hover:rotate-90 transition-transform duration-300"
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="
          w-56 rounded-2xl
          border-2 border-[#8b9c8f]/30
          bg-white/95 backdrop-blur-md
          p-3 shadow-2xl shadow-[#8b9c8f]/10
          animate-in slide-in-from-top-2 duration-200
        "
      >
        {/* Email label with sage gradient */}
        <DropdownMenuLabel
          className="
          text-center text-xs
          bg-gradient-to-r from-[#5f7d5a] to-[#6d8666]
          bg-clip-text !text-transparent
          font-semibold
          pb-2
        "
        >
          {session.user?.email}
        </DropdownMenuLabel>

        {/* Profile link */}
        <DropdownMenuItem
          asChild
          className="
          cursor-pointer rounded-xl
          hover:bg-gradient-to-r hover:from-[#f0f4ee] hover:to-[#e8ede6]
          transition-all duration-300
          my-1
        "
        >
          <Link
            href="/user/profile"
            className="w-full text-center font-medium py-2 text-[#2d3e2d]"
          >
            My Profile
          </Link>
        </DropdownMenuItem>

        {/* Order history link */}
        <DropdownMenuItem
          asChild
          className="
          cursor-pointer rounded-xl
          hover:bg-gradient-to-r hover:from-[#f0f4ee] hover:to-[#e8ede6]
          transition-all duration-300
          my-1
        "
        >
          <Link
            href="/user/orders"
            className="w-full text-center font-medium py-2 text-[#2d3e2d]"
          >
            Order History
          </Link>
        </DropdownMenuItem>

        {/* Admin link */}
        {session.user.role === "admin" && (
          <DropdownMenuItem
            asChild
            className="
              cursor-pointer rounded-xl
              my-1
              transition-all duration-300
              hover:bg-gradient-to-r hover:from-[#7fb069]/20 hover:to-[#88b04b]/20
            "
          >
            <Link
              href="/admin/overview"
              className="
                block w-full text-center font-medium py-2
                bg-gradient-to-r from-[#7fb069] to-[#88b04b]
                bg-clip-text text-transparent
                transition-colors duration-300
              "
            >
              Admin
            </Link>
          </DropdownMenuItem>
        )}

        {/* Sage gradient divider */}
        <div className="my-2 h-px bg-gradient-to-r from-transparent via-[#8b9c8f]/50 to-transparent" />

        {/* Logout button */}
        <DropdownMenuItem asChild>
          <form action={signOutUser} className="w-full">
            <Button
              variant="ghost"
              className="
                w-full rounded-xl
                text-red-500 font-semibold
                hover:bg-red-50
                hover:text-red-600
                transition-all duration-300
                py-2
              "
            >
              Log out
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
