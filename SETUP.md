# BuyMeChai Setup Guide

## 🚀 Setting up Authentication & Database

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create an account
2. Click "New Project"
3. Choose your organization and enter project details:
   - Name: `buymechai` 
   - Database Password: (choose a strong password)
   - Region: Choose the closest to your users (e.g., `ap-south-1` for India)

### 2. Set up Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. In your Supabase project dashboard:
   - Go to Settings → API
   - Copy the Project URL and anon public key

3. Update `.env.local`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### 3. Run Database Schema

1. In your Supabase project dashboard, go to SQL Editor
2. Copy the entire contents of `supabase-schema.sql`
3. Paste it into the SQL editor and run it
4. This will create all the tables, indexes, and policies

### 4. Configure Authentication

1. In Supabase dashboard, go to Authentication → Settings
2. Under "Site URL", add your development URL:
   ```
   http://localhost:3000
   ```
3. Under "Redirect URLs", add:
   ```
   http://localhost:3000/dashboard
   ```

### 5. Test the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000/signup`
3. Create a test account
4. Check if you can:
   - Sign up successfully
   - Get redirected to dashboard
   - Sign out and sign back in

### 6. Verify Database Setup

1. In Supabase dashboard, go to Table Editor
2. Check that you have these tables:
   - `creators`
   - `chai_tiers` 
   - `team_members`
   - `funding_goals`
   - `transactions`
   - `links`
   - `analytics`

3. After signup, check the `creators` table to see your user profile

## 🔧 Features Implemented

### ✅ Authentication System
- **Sign Up**: Creates user account and creator profile
- **Sign In**: Authenticates existing users  
- **Sign Out**: Securely logs out users
- **Protected Routes**: Dashboard requires authentication
- **User Context**: Global auth state management

### ✅ Database Integration
- **PostgreSQL Schema**: Complete database structure
- **Row Level Security**: Secure data access policies
- **TypeScript Types**: Fully typed database interfaces
- **API Functions**: CRUD operations for all entities

### ✅ Creator Dashboard
- **Profile Management**: Edit display name, bio, UPI ID, theme
- **Chai Tiers**: Manage donation tiers (UI ready)
- **Team Members**: Add team for direct payments (UI ready)
- **Links**: Social media link management (UI ready)
- **Goals**: Funding goal tracking (UI ready)
- **Analytics**: Performance metrics (UI ready)

### ✅ User Experience
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages
- **Form Validation**: Client-side input validation
- **Responsive Design**: Mobile-friendly interface
- **Success Feedback**: Clear success confirmations

## 🎯 Next Steps

After setting up Supabase, you can:

1. **Test User Registration**: Create accounts and verify they appear in the database
2. **Customize Profiles**: Update creator profiles through the dashboard  
3. **Add Content**: Create chai tiers, team members, and social links
4. **Deploy**: Deploy to Vercel and update environment variables

## 🔒 Security Notes

- All database operations use Row Level Security (RLS)
- User authentication is handled by Supabase Auth
- Creator profiles are linked to authenticated users
- Public data (creator pages) is accessible without authentication
- Private data (dashboard) requires authentication

## 📞 Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify your `.env.local` file has correct Supabase credentials
3. Ensure the database schema was applied successfully
4. Check Supabase logs in the dashboard

The application is now ready for creators to sign up and start building their funding pages! 🎉