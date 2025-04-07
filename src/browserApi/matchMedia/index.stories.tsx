import { useMatchMediaEffect } from '@/browserApi/matchMedia/useMatchMdeiaEffect.ts';
import { useMatchMedia } from '@/browserApi/matchMedia/useMatchMedia.ts';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const PC_BREAKPOINT = 1024;
const TABLET_BREAKPOINT = 600;

const PC_QUERY = `(min-width: ${PC_BREAKPOINT}px)`;
const TABLET_QUERY = `(min-width: ${TABLET_BREAKPOINT}px) and (max-width: ${PC_BREAKPOINT - 1}px)`;
const MOBILE_QUERY = `(max-width: ${TABLET_BREAKPOINT - 1}px)`;

const MatchMedia = () => {
  const isPC = useMatchMedia(PC_QUERY);
  const isTablet = useMatchMedia(TABLET_QUERY);
  const isMobile = useMatchMedia(MOBILE_QUERY);

  const [matchMessage, setMatchMessage] = useState<string>('');

  useMatchMediaEffect(
    (e) => {
      setMatchMessage(() => {
        if (e.matches) {
          return 'Tablet breakpoint matched!';
        }
        return 'Tablet breakpoint not matched.';
      });
    },
    [],
    TABLET_QUERY,
  );

  return (
    <div>
      <h1>Match Media</h1>
      <p>
        PC Query: {isPC.isReady && isPC.isMatched ? 'Matched' : 'Not Matched'}
      </p>
      <p>
        Tablet Query:
        {isTablet.isReady && isTablet.isMatched ? 'Matched' : 'Not Matched'}
      </p>
      <p>
        Mobile Query:
        {isMobile.isReady && isMobile.isMatched ? 'Matched' : 'Not Matched'}
      </p>
      <p>{matchMessage}</p>
    </div>
  );
};

const meta = {
  title: 'Browser API/Match Media',
  component: MatchMedia,
} satisfies Meta<typeof MatchMedia>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
