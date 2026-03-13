# Shopps

Fresh grocery delivery app — order farm-fresh vegetables and get them delivered in your chosen time slot.

**[Live Demo →](https://shoppsgo.vercel.app/)**

---

### What it does

You browse products, add them to cart, pick a delivery time slot, and check out. There's a full role-based system under the hood — customers get a clean order dashboard, admins get a separate panel to manage products, orders, and users. Built it to feel like something you'd actually ship, not just a portfolio piece.

---

### Features

- **Auth & RBAC** — register, log in, role-based access (admin vs customer) via Auth.js
- **Customer dashboard** — order history, track current orders, manage account
- **Admin dashboard** — manage products, view all orders, handle users
- **Product listing & search** — browse and filter fresh produce
- **Cart & checkout** — full cart flow with order summary
- **Custom delivery time slots** — pick when you want your order delivered
- **Clean UI** — simple, fast, easy to use

---

### Stack

- **Next.js** (App Router) + **TypeScript**
- **Prisma** ORM + **PostgreSQL**
- **Auth.js** for authentication & role management
- **Tailwind CSS** + shadcn/ui
- Deployed on **Vercel**

---

### Run locally

```bash
git clone https://github.com/Roshan04E/shopps
cd shopps
npm install
```

Set up your `.env`:

```env
DATABASE_URL=your_postgresql_url
AUTH_SECRET=your_auth_secret
```

```bash
npx prisma migrate dev
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

### Author

**Roshan Kumar** · [LinkedIn](https://www.linkedin.com/in/roshan-kumar-9909041a5) · [9696roshankumar@gmail.com](mailto:9696roshankumar@gmail.com)
