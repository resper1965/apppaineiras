import React from 'react';
import ShortcutsButtonComponent from './ShorcutsSection';

interface ShortcutAction {
  title: string;
  icon: string;
  color: string;
  onPress: () => void
}

interface ShortcutsButtonProps {
  shortcutActions: ShortcutAction[];
}

const ShortcutsButton: React.FC<ShortcutsButtonProps> = ({ shortcutActions }) => {
  return <ShortcutsButtonComponent shortcutActions={shortcutActions} />;
};

export default ShortcutsButton;
