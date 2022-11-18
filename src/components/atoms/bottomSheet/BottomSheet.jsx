import { BottomSheet as BS } from 'react-spring-bottom-sheet';
export function BottomSheet({ children, ...props }) {
  return (
    <BS
      open={true}
      blocking={false}
      defaultSnap={({ maxHeight }) => maxHeight / 2}
      snapPoints={({ maxHeight }) => [maxHeight / 2, maxHeight]}
      expandOnContentDrag={true}
      {...props}
    >
      {children}
    </BS>
  );
}
