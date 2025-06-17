import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React from 'react';
import { OpaqueColorValue, StyleProp, ViewStyle } from 'react-native';

type IconLibrary = 'material' | 'fontawesome';

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  library = 'material',
}: {
  name: React.ComponentProps<typeof MaterialIcons>['name'] | React.ComponentProps<typeof FontAwesome6>['name'];
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
  library?: IconLibrary;
}) {
  const IconComponent = library === 'material' ? MaterialIcons : FontAwesome6;

  return <IconComponent color={color} size={size} name={name} style={style} />;
}
