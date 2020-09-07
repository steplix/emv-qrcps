/* eslint-disable no-case-declarations */
const { AdditionalDataFieldTemplate, EMVQR, MerchantAccountInformation, MerchantInformationLanguageTemplate, Constants, UnreservedTemplate } = require('./types');

const buildTags = (accumulator, currentCharacter) => {
    const currentTag = accumulator[accumulator.length - 1];
    if (!currentTag.id) {
        currentTag.id = currentCharacter;
    }
    else if (currentTag.id.length < 2) {
        currentTag.id += currentCharacter;
    }
    else if (!currentTag.length) {
        currentTag.length = currentCharacter;
    }
    else if (currentTag.length.length < 2) {
        currentTag.length += currentCharacter;
    }
    else if (!currentTag.value) {
        currentTag.value = currentCharacter;
    }
    else if (currentTag.value.length < currentTag.length) {
        currentTag.value += currentCharacter;
    }
    else {
        accumulator.push({ id: currentCharacter });
        return accumulator;
    }
    accumulator[accumulator.length - 1] = currentTag;
    return accumulator;
};

const parseAdditionalDataFieldTemplate = (tags) => {
    const result = tags.reduce((additionalDataFieldTemplate, tag) => {
        switch (tag.id) {
            case Constants.ADDITIONAL_FIELD.AdditionalIDBillNumber:
                additionalDataFieldTemplate.setBillNumber(tag.value);
                break;
            case Constants.ADDITIONAL_FIELD.AdditionalIDMobileNumber:
                additionalDataFieldTemplate.setMobileNumber(tag.value);
                break;
            case Constants.ADDITIONAL_FIELD.AdditionalIDStoreLabel:
                additionalDataFieldTemplate.setStoreLabel(tag.value);
                break;
            case Constants.ADDITIONAL_FIELD.AdditionalIDLoyaltyNumber:
                additionalDataFieldTemplate.setLoyaltyNumber(tag.value);
                break;
            case Constants.ADDITIONAL_FIELD.AdditionalIDReferenceLabel:
                additionalDataFieldTemplate.setReferenceLabel(tag.value);
                break;
            case Constants.ADDITIONAL_FIELD.AdditionalIDCustomerLabel:
                additionalDataFieldTemplate.setCustomerLabel(tag.value);
                break;
            case Constants.ADDITIONAL_FIELD.AdditionalIDTerminalLabel:
                additionalDataFieldTemplate.setTerminalLabel(tag.value);
                break;
            case Constants.ADDITIONAL_FIELD.AdditionalIDPurposeTransaction:
                additionalDataFieldTemplate.setPurposeTransaction(tag.value);
                break;
            case Constants.ADDITIONAL_FIELD.AdditionalIDAdditionalConsumerDataRequest:
                additionalDataFieldTemplate.setAdditionalConsumerDataRequest(tag.value);
                break;
            default:
                if (tag.id >= Constants.ADDITIONAL_FIELD.AdditionalIDPaymentSystemSpecificTemplatesRangeStart && tag.id <= Constants.ADDITIONAL_FIELD.AdditionalIDPaymentSystemSpecificTemplatesRangeEnd) {
                    const paymentSystemSpecificTags = tag.value.split('').reduce(buildTags, [{}]);
                    const t = parseMerchantAccountInformation(paymentSystemSpecificTags);
                    additionalDataFieldTemplate.addPaymentSystemSpecific(tag.id, t);
                }
                else if (tag.id >= Constants.ADDITIONAL_FIELD.AdditionalIDRFUforEMVCoRangeStart && tag.id <= Constants.ADDITIONAL_FIELD.AdditionalIDRFUforEMVCoRangeEnd) {
                    additionalDataFieldTemplate.addRFUForEMVCo(tag.id, tag.value);
                }
        }
        return additionalDataFieldTemplate;
    }, AdditionalDataFieldTemplate());
    return result;
};

const parseMerchantInformationLanguageTemplate = (tags) => {
    const result = tags.reduce((merchantInformationLanguageTemplate, tag) => {
        switch (tag.id) {
            case Constants.MERCHANT_INFORMATION.MerchantInformationIDLanguagePreference:
                merchantInformationLanguageTemplate.setLanguagePreference(tag.value);
                break;
            case Constants.MERCHANT_INFORMATION.MerchantInformationIDMerchantName:
                merchantInformationLanguageTemplate.setMerchantName(tag.value);
                break;
            case Constants.MERCHANT_INFORMATION.MerchantInformationIDMerchantCity:
                merchantInformationLanguageTemplate.setMerchantCity(tag.value);
                break;
            default:
                if (tag.id >= Constants.MERCHANT_INFORMATION.MerchantInformationIDRFUforEMVCoRangeStart && tag.id <= Constants.MERCHANT_INFORMATION.MerchantInformationIDRFUforEMVCoRangeEnd) {
                    merchantInformationLanguageTemplate.addRFUForEMVCo(tag.id, tag.value);
                }
        }
        return merchantInformationLanguageTemplate;
    }, MerchantInformationLanguageTemplate());
    return result;
};

const parseMerchantAccountInformation = (tags) => {
    const result = tags.reduce((merchantAccountInformation, tag) => {
        switch (tag.id) {
            case Constants.MERCHANT_ACCOUNT_INFORMATION.MerchantAccountInformationIDGloballyUniqueIdentifier:
                merchantAccountInformation.setGloballyUniqueIdentifier(tag.value);
                break;
            default:
                if (tag.id >= Constants.MERCHANT_ACCOUNT_INFORMATION.MerchantAccountInformationIDPaymentNetworkSpecificStart && tag.id <= Constants.MERCHANT_ACCOUNT_INFORMATION.MerchantAccountInformationIDPaymentNetworkSpecificEnd) {
                    merchantAccountInformation.addPaymentNetworkSpecific(tag.id, tag.value);
                }
        }
        return merchantAccountInformation;
    }, MerchantAccountInformation());
    return result;
};

const parseUnreservedTemplate = (tags) => {
    const result = tags.reduce((unreservedTemplate, tag) => {
        switch (tag.id) {
            case Constants.UNRESERVED_TEMPLATE.UnreservedTemplateIDGloballyUniqueIdentifier:
                unreservedTemplate.setGloballyUniqueIdentifier(tag.value);
                break;
            default:
                if (tag.id >= Constants.UNRESERVED_TEMPLATE.UnreservedTemplateIDContextSpecificDataStart && tag.id <= Constants.UNRESERVED_TEMPLATE.UnreservedTemplateIDContextSpecificDataEnd) {
                    unreservedTemplate.addContextSpecificData(tag.id, tag.value);
                }
        }
        return unreservedTemplate;
    }, UnreservedTemplate());
    return result;
};

const toEMVQR = (qrcodeValue) => {
    const tags = qrcodeValue.split('').reduce(buildTags, [{}]);
    const result = tags.reduce((emvqr, tag) => {
        switch (tag.id) {
            case Constants.ID.IDPayloadFormatIndicator:
                emvqr.setPayloadFormatIndicator(tag.value);
                break;
            case Constants.ID.IDPointOfInitiationMethod:
                emvqr.setPointOfInitiationMethod(tag.value);
                break;
            case Constants.ID.IDMerchantCategoryCode:
                emvqr.setMerchantCategoryCode(tag.value);
                break;
            case Constants.ID.IDTransactionCurrency:
                emvqr.setTransactionCurrency(tag.value);
                break;
            case Constants.ID.IDTransactionAmount:
                emvqr.setTransactionAmount(tag.value);
                break;
            case Constants.ID.IDTipOrConvenienceIndicator:
                emvqr.setTipOrConvenienceIndicator(tag.value);
                break;
            case Constants.ID.IDValueOfConvenienceFeeFixed:
                emvqr.setValueOfConvenienceFeeFixed(tag.value);
                break;
            case Constants.ID.IDValueOfConvenienceFeePercentage:
                emvqr.setValueOfConvenienceFeePercentage(tag.value);
                break;
            case Constants.ID.IDCountryCode:
                emvqr.setCountryCode(tag.value);
                break;
            case Constants.ID.IDMerchantName:
                emvqr.setMerchantName(tag.value);
                break;
            case Constants.ID.IDMerchantCity:
                emvqr.setMerchantCity(tag.value);
                break;
            case Constants.ID.IDPostalCode:
                emvqr.setPostalCode(tag.value);
                break;
            case Constants.ID.IDAdditionalDataFieldTemplate:
                const additionalDataFieldTemplateTags = tag.value.split('').reduce(buildTags, [{}]);
                const adft = parseAdditionalDataFieldTemplate(additionalDataFieldTemplateTags);
                emvqr.setAdditionalDataFieldTemplate(adft);
                break;
            case Constants.ID.IDCRC:
                emvqr.setCRC(tag.value);
                break;
            case Constants.ID.IDMerchantInformationLanguageTemplate:
                const merchantInformarionLanguageTemplateTags = tag.value.split('').reduce(buildTags, [{}]);
                const t = parseMerchantInformationLanguageTemplate(merchantInformarionLanguageTemplateTags);
                emvqr.setMerchantInformationLanguageTemplate(t);
                break;
            default:

                if (tag.id >= Constants.ID.IDMerchantAccountInformationRangeStart && tag.id <= Constants.ID.IDMerchantAccountInformationRangeEnd) {
                    const merchantAccountInformationTags = tag.value.split('').reduce(buildTags, [{}]);
                    const t = parseMerchantAccountInformation(merchantAccountInformationTags);
                    emvqr.addMerchantAccountInformation(tag.id, t);
                }
                else if (tag.id >= Constants.ID.IDRFUForEMVCoRangeStart && tag.id <= Constants.ID.IDRFUForEMVCoRangeEnd) {
                    emvqr.addRFUforEMVCo(tag.id, tag.value);
                }
                else if (tag.id >= Constants.ID.IDUnreservedTemplatesRangeStart && tag.id <= Constants.ID.IDUnreservedTemplatesRangeEnd) {
                    const unreservedTemplateTags = tag.value.split('').reduce(buildTags, [{}]);
                    const t = parseUnreservedTemplate(unreservedTemplateTags);
                    emvqr.addUnreservedTemplates(tag.id, t);
                }
        }
        return emvqr;
    }, EMVQR());
    return result;
};

module.exports = {
    toEMVQR
};
