export interface WheelData {
	_id: string;
	style: string;
	name: { en: string; es?: string };
	availableFinishes?: string[];
	spokeCount?: number;
	quoteOnly: boolean;
	priceRange?: { min?: number; max?: number };
	images?: any[];
}

export const WHEELS_QUERY = `*[_type == "wheel"] | order(style asc) {
  _id,
  style,
  name,
  availableFinishes,
  spokeCount,
  quoteOnly,
  priceRange,
  images
}`;

export interface BusinessInfo {
	hours?: { day: string; open?: string; close?: string; closed?: boolean }[];
	contact?: { phone?: string; email?: string; address?: string };
	socialHandles?: { platform: string; handle?: string; url?: string }[];
}

export const BUSINESS_INFO_QUERY = `*[_type == "businessInfo"][0]{ hours, contact, socialHandles }`;
