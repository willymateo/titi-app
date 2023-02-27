import { CloudError, Group, MoreVert, Trash, User, Wristwatch } from "iconoir-react-native";
import { Card, Chip, Text, Avatar, IconButton, useTheme, Menu } from "react-native-paper";
import { formatDistanceToNow, intlFormat, parseISO } from "date-fns";
import { deleteAdventureById } from "../services/app/adventures";
import { useErrorDialog } from "../hooks/useErrorDialog";
import { useNavigation } from "@react-navigation/native";
import { useLoading } from "../hooks/useLoading";
import { useVisible } from "../hooks/useVisible";
import { LoadingDialog } from "./LoadingDialog";
import { sharedStyles } from "../shared/styles";
import { useTranslation } from "react-i18next";
import { ErrorDialog } from "./ErrorDialog";
import { useSelector } from "react-redux";
import { View } from "react-native";

function AdventureMiniCard({
  publisher: { id: publisherId = "", username = "", gender, photoUrl = "" } = {},
  numInvitations = 1,
  description = "",
  startDateTime,
  endDateTime,
  style = {},
  title = "",
  id,
}) {
  const { t } = useTranslation("translation", { keyPrefix: "components.adventures" });
  const { isVisible: isMenuVisible, show: showMenu, hide: hideMenu } = useVisible();
  const { language } = useSelector(({ languagePreference }) => languagePreference);
  const { id: sessionUserId } = useSelector(({ userSession }) => userSession);
  const { loading, startLoading, stopLoading } = useLoading();
  const { error, showError, hideError } = useErrorDialog();
  const navigation = useNavigation();
  const { colors } = useTheme();

  const handleDelete = async () => {
    hideMenu();
    startLoading();
    const { error: errorOnDelete } = await deleteAdventureById({ id });

    if (errorOnDelete) {
      showError({ error: errorOnDelete });
    }

    stopLoading();
  };

  return (
    <>
      <Card
        style={style}
        onPress={() =>
          navigation.navigate("AdventureForm", {
            buttonLabel: t("updateAdventure"),
            readOnly: true,
            numInvitations,
            startDateTime,
            endDateTime,
            description,
            title,
          })
        }>
        <Card.Title
          right={
            sessionUserId === publisherId
              ? props => (
                  <Menu
                    visible={isMenuVisible}
                    onDismiss={hideMenu}
                    anchor={
                      <IconButton
                        {...props}
                        icon={iconProps => <MoreVert {...iconProps} {...sharedStyles.iconoirM} />}
                        onPress={showMenu}
                      />
                    }>
                    <Menu.Item
                      leadingIcon={props => (
                        <Trash {...props} {...sharedStyles.iconoirM} color={colors.error} />
                      )}
                      onPress={handleDelete}
                      title={t("delete")}
                    />
                  </Menu>
                )
              : null
          }
          left={props => <Avatar.Image {...props} source={{ uri: photoUrl }} />}
          subtitle={`${username} ● ${gender}`}
          title={title}
        />
        <Card.Content>
          <Text variant="titleLarge">
            {intlFormat(
              parseISO(endDateTime),
              {
                minute: "numeric",
                hour: "numeric",
                weekday: "long",
                year: "numeric",
                day: "numeric",
                month: "long",
                hour12: true,
              },
              { locale: language }
            )}
          </Text>

          <Text>{description}</Text>

          <View
            style={[
              sharedStyles.flxACenter,
              sharedStyles.flxSBtwn,
              sharedStyles.flxWrap,
              sharedStyles.flxRow,
            ]}>
            <View>
              <Chip
                icon={props => {
                  return numInvitations > 1 ? (
                    <Group {...props} {...sharedStyles.iconoirS} />
                  ) : (
                    <User {...props} {...sharedStyles.iconoirS} />
                  );
                }}>
                {t("invitations", { count: numInvitations })}
              </Chip>
            </View>
            <View style={[sharedStyles.flxRow, sharedStyles.flxACenter, sharedStyles.flxCenter]}>
              <Text style={[sharedStyles.txtAlignR, { color: colors.surfaceVariant }]}>
                {`${t("published")} ${formatDistanceToNow(parseISO(startDateTime), {
                  includeSeconds: true,
                  addSuffix: true,
                })}`}
              </Text>
              <IconButton
                icon={props => <Wristwatch {...props} {...sharedStyles.iconoirS} />}
                disabled
              />
            </View>
          </View>
        </Card.Content>
      </Card>

      <ErrorDialog isVisible={error} onDismiss={hideError} content={error} icon={CloudError} />
      <LoadingDialog isVisible={loading} />
    </>
  );
}

export { AdventureMiniCard };
