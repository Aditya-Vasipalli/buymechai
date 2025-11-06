import { notFound } from 'next/navigation';
import CreatorPage from '@/components/CreatorPage';
import { supabase } from '@/lib/supabase';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  
  const { data: creator } = await supabase
    .from('creators')
    .select('display_name, bio, profile_picture_url')
    .eq('username', username)
    .eq('is_active', true)
    .single();

  if (!creator) {
    return {
      title: 'Creator Not Found - BuyMeChai',
      description: 'The creator you are looking for does not exist.'
    };
  }

  return {
    title: `${creator.display_name} - BuyMeChai`,
    description: creator.bio || `Support ${creator.display_name} by buying them a chai!`,
    openGraph: {
      title: `${creator.display_name} - BuyMeChai`,
      description: creator.bio || `Support ${creator.display_name} by buying them a chai!`,
      images: creator.profile_picture_url ? [creator.profile_picture_url] : [],
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${creator.display_name} - BuyMeChai`,
      description: creator.bio || `Support ${creator.display_name} by buying them a chai!`,
      images: creator.profile_picture_url ? [creator.profile_picture_url] : [],
    }
  };
}

export default async function Page({ params }: Props) {
  const { username } = await params;
  
  // Verify creator exists
  const { data: creator, error } = await supabase
    .from('creators')
    .select('id')
    .eq('username', username)
    .eq('is_active', true)
    .single();

  if (error || !creator) {
    notFound();
  }

  return <CreatorPage username={username} />;
}