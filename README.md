# BuyMeChai - Creator Funding Platform

A modern creator funding platform built with Next.js, featuring UPI payments, link-in-bio functionality, and team-based funding.

## Features

### 🎯 **UPI-Powered Creator Funding**
- **Embedded Funding Button**: Prominent "BuyMeChai" button for easy support
- **Custom Chai Tiers**: Predefined amounts like ₹50 for Masala Chai, ₹100 for Chai & Samosa
- **Direct UPI Payment**: 
  - Mobile: Direct UPI app integration (Google Pay, PhonePe, BHIM)
  - Desktop: Dynamic transaction-specific UPI QR codes
- **Goal Setting & Progress**: Visible progress bars for funding goals
- **Custom Notes**: Supporters can include messages with their tips

### 🔗 **Centralized Link-in-Bio Page**
- **Personalized URL**: Memorable, branded links (e.g., buymechai.dev/username)
- **Multiple Links**: YouTube, Instagram, Spotify, Amazon store, e-books, etc.
- **Analytics**: Click-through and traffic analytics for all linked content
- **Themed Customization**: Templates and customization options to match creator's brand
- **Team Based Funding**: Support for team members (Editor, Writer, etc.) with transparent funding

## Tech Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with custom themes
- **Backend**: Supabase (PostgreSQL)
- **Payments**: UPI integration with QR code generation
- **Deployment**: Vercel
- **Analytics**: Built-in tracking system

## Quick Start

### 1. Clone and Install

```bash
cd buymechai
npm install
```

### 2. Environment Setup

Create `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# UPI Configuration
NEXT_PUBLIC_UPI_ID=your-upi-id@paytm
NEXT_PUBLIC_MERCHANT_NAME=BuyMeChai

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Setup

1. Create a new Supabase project
2. Run the SQL schema from `supabase-schema.sql` in the Supabase SQL editor
3. Enable Row Level Security (RLS) policies are included in the schema

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the app running.

## Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── [username]/        # Dynamic creator pages
│   ├── dashboard/         # Creator dashboard
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── AnalyticsDashboard.tsx
│   ├── BuyChaiButton.tsx
│   ├── CreatorDashboard.tsx
│   ├── CreatorPage.tsx
│   └── FundingGoalManager.tsx
└── lib/                   # Utilities and configurations
    ├── supabase.ts        # Supabase client and types
    └── upi.ts             # UPI payment utilities
```

## Database Schema

### Core Tables
- **creators**: User profiles and settings
- **chai_tiers**: Custom pricing tiers (₹50, ₹100, etc.)
- **funding_goals**: Goal tracking with progress bars
- **team_members**: Team-based funding support
- **transactions**: Payment records and supporter messages
- **links**: Link-in-bio functionality
- **analytics**: Click and view tracking

## Key Features Implementation

### UPI Payments
- Dynamic QR code generation using the `qrcode` library
- Mobile device detection for direct UPI app launching
- Support for all major UPI apps (Google Pay, PhonePe, Paytm, BHIM)
- Transaction tracking and status management

### Creator Pages
- Personalized URLs with username routing
- Responsive design optimized for mobile sharing
- Custom theming with brand colors
- SEO optimization with dynamic metadata

### Analytics Dashboard
- Real-time view and click tracking
- Revenue analytics and donation history
- Link performance metrics
- Data export functionality

## Deployment

### Deploy to Vercel

1. **Connect Repository**:
   ```bash
   vercel --prod
   ```

2. **Set Environment Variables** in Vercel Dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_UPI_ID`
   - `NEXT_PUBLIC_APP_URL`

3. **Deploy**:
   The app will automatically deploy on push to main branch.

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | `https://xyz.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | `eyJhbG...` |
| `NEXT_PUBLIC_UPI_ID` | Default UPI ID for platform | `platform@paytm` |
| `NEXT_PUBLIC_APP_URL` | Production URL | `https://buymechai.vercel.app` |

## Usage Examples

### Creating a Creator Page

1. Visit `/dashboard`
2. Set up your profile with display name, bio, and UPI ID
3. Add chai tiers (e.g., ₹50 Regular Chai, ₹100 Masala Chai)
4. Add team members if needed
5. Create links to your content
6. Share your personalized URL: `buymechai.dev/yourusername`

### Making a Payment

1. Visit any creator's page
2. Click "Buy me a chai"
3. Select a chai tier or enter custom amount
4. Optionally choose a team member to support
5. Add your name and message
6. On mobile: Redirected to UPI app
7. On desktop: Scan QR code with any UPI app

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@buymechai.dev or join our community Discord.

---

**Built with ❤️ for creators in India**
