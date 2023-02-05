import { intervalToDuration, isValid, parseISO } from "date-fns";
import { t } from "i18next";

const isOfLegalAge = dateString => {
  const bornDate = parseISO(dateString);
  if (!isValid(bornDate)) {
    return false;
  }

  const { years } = intervalToDuration({
    start: bornDate,
    end: new Date(),
  });

  return years >= 18 || t("components.inputHookForm.bornDateOfLegalAge");
};

export { isOfLegalAge };
