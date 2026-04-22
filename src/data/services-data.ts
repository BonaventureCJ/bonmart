// src/data/services-data.ts

import { type IconName } from '@/components/ui/icon/icon';

export interface Service {
    id: string;
    title: string;
    description: string;
    icon: IconName;
}

export const SERVICES_DATA: Service[] = [
    {
        id: 'delivery',
        title: 'Carbon-Neutral Delivery',
        description: 'Every shipment is offset through our reforestation partnerships, ensuring your doorstep delivery leaves zero carbon footprint.',
        icon: 'globe',
    },
    {
        id: 'packaging',
        title: 'Plastic-Free Packaging',
        description: 'We utilize 100% biodegradable and compostable materials for all parcels. No microplastics, no landfill waste.',
        icon: 'check',
    },
    {
        id: 'circularity',
        title: 'Circular Return Program',
        description: 'Finished with your product? Send it back through our circularity loop for responsible upcycling or professional recycling.',
        icon: 'monitor',
    },
];
