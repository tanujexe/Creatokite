/* ---------- Creator Mock Data ---------- */
export const creatorEarningsData = [
  { month: 'Jan', amount: 4200 },
  { month: 'Feb', amount: 6800 },
  { month: 'Mar', amount: 5200 },
  { month: 'Apr', amount: 9400 },
  { month: 'May', amount: 7600 },
  { month: 'Jun', amount: 12800 },
  { month: 'Jul', amount: 11200 },
];

export const creatorCampaigns = [
  { id: 1, brand: 'Nykaa Beauty', niche: 'Beauty', budget: 15000, deadline: '3 days', status: 'active', deliverable: 'Instagram Reel + Story' },
  { id: 2, brand: 'boAt Audio', niche: 'Tech', budget: 20000, deadline: '7 days', status: 'review', deliverable: 'YouTube Short + Post' },
  { id: 3, brand: 'Mamaearth', niche: 'Skincare', budget: 8000, deadline: '5 days', status: 'pending', deliverable: 'Instagram Post x2' },
  { id: 4, brand: 'WOW Skin Science', niche: 'Beauty', budget: 12000, deadline: 'Completed', status: 'completed', deliverable: 'Instagram Reel' },
];

export const availableCampaigns = [
  { id: 10, brand: 'mCaffeine', niche: 'Skincare', budget: '₹10,000–18,000', followers: '2K+', match: 94, slots: 8 },
  { id: 11, brand: 'Lenskart', niche: 'Fashion', budget: '₹12,000–25,000', followers: '5K+', match: 87, slots: 12 },
  { id: 12, brand: 'Meesho', niche: 'Lifestyle', budget: '₹6,000–15,000', followers: '1K+', match: 91, slots: 20 },
];

/* ---------- Brand Mock Data ---------- */
export const brandRoiData = [
  { campaign: 'Nykaa Summer', reach: 280000, engagement: 18400, spend: 75000 },
  { campaign: 'boAt Monsoon', reach: 190000, engagement: 12000, spend: 60000 },
  { campaign: 'Mamaearth Q3', reach: 340000, engagement: 24000, spend: 95000 },
  { campaign: 'WOW October', reach: 220000, engagement: 15600, spend: 70000 },
];

export const creatorPool = [
  { id: 1, name: 'Priya Sharma', niche: 'Beauty & Skincare', followers: '12.4K', er: '7.2%', trust: 94, rate: '₹8,000–15,000', avatar: 'P', verified: true },
  { id: 2, name: 'Rahul Mehta', niche: 'Tech & Gadgets', followers: '8.2K', er: '9.1%', trust: 89, rate: '₹6,000–12,000', avatar: 'R', verified: true },
  { id: 3, name: 'Ananya Kohli', niche: 'Fashion & Lifestyle', followers: '21K', er: '5.8%', trust: 96, rate: '₹15,000–25,000', avatar: 'A', verified: true },
  { id: 4, name: 'Karan Singh', niche: 'Fitness & Health', followers: '6.8K', er: '11.2%', trust: 91, rate: '₹5,000–10,000', avatar: 'K', verified: false },
];

/* ---------- Admin Mock Data ---------- */
export const platformGrowth = [
  { month: 'Jan', creators: 1200, brands: 45, campaigns: 60 },
  { month: 'Feb', creators: 1800, brands: 62, campaigns: 88 },
  { month: 'Mar', creators: 2400, brands: 78, campaigns: 120 },
  { month: 'Apr', creators: 3100, brands: 95, campaigns: 165 },
  { month: 'May', creators: 3800, brands: 118, campaigns: 210 },
  { month: 'Jun', creators: 4600, brands: 140, campaigns: 268 },
  { month: 'Jul', creators: 5200, brands: 162, campaigns: 310 },
];

export const nicheDistribution = [
  { name: 'Beauty & Skincare', value: 32, color: '#F97316' },
  { name: 'Tech & Gadgets', value: 18, color: '#3B82F6' },
  { name: 'Fashion', value: 22, color: '#EC4899' },
  { name: 'Fitness', value: 14, color: '#10B981' },
  { name: 'Food & Travel', value: 14, color: '#F59E0B' },
];
