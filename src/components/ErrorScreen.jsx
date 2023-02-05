import { Text, useTheme } from "react-native-paper";
import { CloudError } from "iconoir-react-native";
import { sharedStyles } from "../shared/styles";
import { View } from "react-native";

function ErrorScreen({
  textVariant = "titleLarge",
  textStyle = {},
  style = {},
  icon: Icon,
  children,
}) {
  const { colors } = useTheme();

  return (
    <View style={[sharedStyles.flxCenter, style]}>
      <View>
        {Icon ? <Icon /> : <CloudError {...sharedStyles.iconoirL} color={colors.error} />}
      </View>
      <Text variant={textVariant} style={[sharedStyles.mt15, sharedStyles.txtAlignC, textStyle]}>
        {children}
      </Text>
    </View>
  );
}

export { ErrorScreen };
