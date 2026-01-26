# TMS Frontend - React + Vite

Beautiful, modern frontend for Transportation Management System built with React, Vite, and Tailwind CSS.

## 🎨 Features

- ✅ Modern, responsive UI with Tailwind CSS
- ✅ Beautiful animations and transitions
- ✅ Grid and Tile view for shipments
- ✅ Real-time search and filtering
- ✅ JWT Authentication
- ✅ GraphQL integration with Apollo Client
- ✅ Dashboard with statistics
- ✅ Hamburger menu with submenu support
- ✅ Horizontal top navigation
- ✅ Detailed shipment view modal
- ✅ Role-based access control

## 📁 Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx              # Top navigation bar
│   │   ├── Sidebar.jsx             # Side navigation menu
│   │   ├── Layout.jsx              # Main layout wrapper
│   │   ├── GridView.jsx            # Table grid view
│   │   ├── TileView.jsx            # Card tile view
│   │   └── ShipmentDetail.jsx      # Detail modal
│   ├── pages/
│   │   ├── Login.jsx               # Login page
│   │   ├── Dashboard.jsx           # Dashboard page
│   │   └── Shipments.jsx           # Shipments page
│   ├── graphql/
│   │   └── queries.js              # GraphQL queries/mutations
│   ├── lib/
│   │   └── apollo.js               # Apollo Client setup
│   ├── store/
│   │   └── authStore.js            # Zustand auth state
│   ├── App.jsx                     # Main app component
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Install Additional Required Packages

The zustand persist middleware:
```bash
npm install zustand/middleware
```

Apollo Client link utilities:
```bash
npm install @apollo/client/link/context
```

### 3. Start Development Server

```bash
npm run dev
```

The app will run on `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

## 📦 Dependencies

### Core
- **react** & **react-dom** - UI framework
- **vite** - Build tool
- **react-router-dom** - Routing

### GraphQL & State
- **@apollo/client** - GraphQL client
- **graphql** - GraphQL language
- **zustand** - State management

### UI & Icons
- **tailwindcss** - Utility-first CSS
- **lucide-react** - Beautiful icons
- **date-fns** - Date formatting

## 🎨 UI Components

### 1. Login Page
- Beautiful gradient background
- Animated login form
- Demo credentials display
- Error handling

### 2. Dashboard
- Statistics cards with icons
- Recent shipments list
- Quick actions panel
- Status overview

### 3. Shipments Page
- **Grid View** - Full table with 10 columns
- **Tile View** - Card-based layout
- Search and filter functionality
- Pagination support
- Detail modal view
- Action menu (edit, flag, delete)

### 4. Navigation
- **Header** - Search, notifications, user menu
- **Sidebar** - Menu items with submenu support
- Responsive hamburger menu

## 🔐 Authentication

Login with demo credentials:
- **Admin**: `admin` / `admin123`
- **Employee**: `employee` / `employee123`

JWT token is stored in localStorage and automatically added to GraphQL requests.

## 🎯 GraphQL Integration

### Queries
- `GET_SHIPMENTS` - Fetch shipments with pagination/filters
- `GET_SHIPMENT` - Fetch single shipment details

### Mutations
- `LOGIN` - User authentication
- `CREATE_SHIPMENT` - Create new shipment
- `UPDATE_SHIPMENT` - Update existing shipment
- `DELETE_SHIPMENT` - Delete shipment

## 🎨 Styling

### Tailwind Classes
The project uses custom utility classes:

```css
.btn - Base button
.btn-primary - Primary blue button
.btn-secondary - Secondary gray button
.btn-danger - Red danger button
.input - Input field styling
.card - White card with shadow
.badge - Status badge
```

### Status Badges
- `badge-pending` - Yellow
- `badge-in-transit` - Blue
- `badge-delivered` - Green
- `badge-cancelled` - Red

### Animations
- `animate-fade-in` - Fade in animation
- `animate-slide-up` - Slide up animation
- `animate-slide-down` - Slide down animation

## 📱 Responsive Design

- **Mobile First** approach
- Breakpoints:
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px

## 🔧 Configuration

### Apollo Client (`lib/apollo.js`)
```javascript
const httpLink = createHttpLink({
  uri: 'http://localhost:8080/graphql',
});
```

Change the URI for production deployment.

### Vite Proxy (`vite.config.js`)
```javascript
proxy: {
  '/graphql': {
    target: 'http://localhost:8080',
    changeOrigin: true,
  }
}
```

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables:
   ```
   VITE_API_URL=https://your-backend-url.com
   ```
4. Deploy

### Deploy to Netlify

1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder
3. Add redirect rule for SPA:
   Create `public/_redirects`:
   ```
   /* /index.html 200
   ```

## 🎯 Features Checklist

- [x] Hamburger menu with submenu
- [x] Horizontal top navigation
- [x] Beautiful grid view (10 columns)
- [x] Tile view with cards
- [x] View switcher (grid ↔ tile)
- [x] Detail modal on tile click
- [x] Action menu (edit, flag, delete)
- [x] Search functionality
- [x] Status filtering
- [x] Pagination
- [x] Responsive design
- [x] Authentication
- [x] Beautiful animations
- [x] Loading states
- [x] Error handling

## 🎨 Color Scheme

Primary: Blue (#3b82f6)
- Represents trust and reliability in logistics

Status Colors:
- Pending: Yellow (#fbbf24)
- In Transit: Blue (#3b82f6)
- Delivered: Green (#10b981)
- Cancelled: Red (#ef4444)

## 📝 PostCSS Configuration

Create `postcss.config.js`:
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## 🎯 Next Steps

1. Implement create/edit shipment forms
2. Add more dashboard charts
3. Implement real-time updates
4. Add export functionality
5. Add advanced filtering
6. Implement notifications
7. Add user profile page
8. Add settings page

## 🐛 Troubleshooting

### Issue: Zustand persist not working
Solution:
```bash
npm install zustand
```
Import persist correctly:
```javascript
import { persist } from 'zustand/middleware'
```

### Issue: Apollo Client auth link not found
Solution:
```bash
npm install @apollo/client
```
Import:
```javascript
import { setContext } from '@apollo/client/link/context'
```

### Issue: Tailwind classes not working
Solution: Make sure `index.css` is imported in `main.jsx`

## 📄 License

MIT

---

**Built with ❤️ using React, Vite, and Tailwind CSS**