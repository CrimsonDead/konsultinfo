import React, { FC } from 'react';
import { bubblesPositions } from '../constants/bubblesConstants';
import { MovingBubbles } from '@/components/Animations';
import { OnboardingBubble } from '@/components/svgs';
import { LoginForm } from '.';

export const LoginPage: FC = () => {
  return (
    <main className="flex items-center justify-center h-[100vh] bg-cover bg-left bg-no-repeat">
      <section className=" max-w-xl overflow-hidden rounded-lg bg-white  shadow-lg backdrop-blur-3xl">
        <div className="p-6">
          <h1 className="mb-8 grow text-[25px] font-bold text-black/60">
            Вход
          </h1>
          <LoginForm />
        </div>
      </section>
      {bubblesPositions.map(({ left, top, id }) => (
        <MovingBubbles
          left={left}
          top={top}
          key={id}>
          <OnboardingBubble />
        </MovingBubbles>
      ))}
    </main>
  );
};
