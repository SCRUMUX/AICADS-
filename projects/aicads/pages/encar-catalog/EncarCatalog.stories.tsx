import type { Meta, StoryObj } from '@storybook/react';
import EncarCatalog from './EncarCatalog';
import EncarCarCardPage from './EncarCarCardPage';

const meta: Meta<typeof EncarCatalog> = {
  title: 'Pages/EncarCatalog',
  component: EncarCatalog,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof EncarCatalog>;

export const Default: Story = {};

export const CardPage: StoryObj<typeof EncarCarCardPage> = {
  render: () => {
    const car = {
      id: 1,
      name: 'Mercedes-Benz S-Class Maybach S580 4MATIC',
      price: '64 264 000 ₽',
      badge: 'Высокая цена' as const,
      yearMonth: '2021.12',
      mileage: '61 800 км.',
      drive: '4WD',
      engine: '3 982 см³ (503 л.с.)',
      fuel: 'Бензин',
      transmission: 'АКПП',
      insurancePayout: '725 703 ₽',
      firstRegistration: '2021.12',
      bodyColor: 'Чёрный',
      interiorColor: 'Бежевый',
      seats: '5',
      trim: 'Maybach S580 4MATIC',
      src: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=75',
      photos: [
        'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=75',
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=75',
        'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=75',
      ],
      options: ['ABS', 'Навигация', 'Кожа', 'Подогрев сидений', 'Парктроник', 'Камера 360°'],
    };
    const similar = [
      { ...car, id: 2, name: 'Mercedes-Benz S-Class S400 d 4MATIC', price: '60 749 100 ₽', mileage: '21 000 км.' },
      { ...car, id: 3, name: 'Mercedes-Benz S-Class S450 4MATIC', price: '14 972 100 ₽', mileage: '28 км.' },
    ];
    return (
      <EncarCarCardPage
        car={car}
        similarCars={similar}
        onBack={() => {}}
      />
    );
  },
  parameters: { layout: 'fullscreen' },
};
