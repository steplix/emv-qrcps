/* eslint-disable no-return-assign */
const EMPTY_STRING = '';

const DATA_TYPE = {
    BINARY: 'binary',
    RAW: 'raw',
};

const PAYLOAD = {
    IDPayloadFormatIndicator: '85', // (M) Payload Format Indicator
    IDApplicationTemplate: '61', // (M) Application Template
    IDCommonDataTemplate: '62', // (O) Common Data Template
    IDApplicationSpecificTransparentTemplate: '63', // (O) Application Specific Transparent Template
    IDCommonDataTransparentTemplate: '64', // (O) Common Data Transparent Template
};

const TAG = {
    TagApplicationDefinitionFileName: '4F',
    TagApplicationLabel: '50',
    TagTrack2EquivalentData: '57',
    TagApplicationPAN: '5A',
    TagCardholderName: '5F20',
    TagLanguagePreference: '5F2D',
    TagIssuerURL: '5F50',
    TagApplicationVersionNumber: '9F08',
    TagIssuerApplicationData: '9F10',
    TagTokenRequestorID: '9F19',
    TagPaymentAccountReference: '9F24',
    TagLast4DigitsOfPAN: '9F25',
    TagApplicationCryptogram: '9F26',
    TagApplicationTransactionCounter: '9F36',
    TagUnpredictableNumber: '9F37',
};

const EMVQR = (
    dataPayloadFormatIndicator = EMPTY_STRING, // 85
    applicationTemplates = [], // 61
    commonDataTemplates = [] // 62
) => {
    const setDataPayloadFormatIndicator = (value) => {
        dataPayloadFormatIndicator = value;
    };

    const addApplicationTemplate = (value) => {
        applicationTemplates.push(value);
    };

    const addCommonDataTemplate = (value) => {
        commonDataTemplates.push(value);
    };

    const dataWithType = (dataType) => {
        const indent = EMPTY_STRING;
        let str = EMPTY_STRING;
        str += formatDataWithType(dataType, indent, buildFormat(PAYLOAD.IDPayloadFormatIndicator, toHex(dataPayloadFormatIndicator)));
        str += applicationTemplates.reduce((accumulator, a) => accumulator += a.dataWithType(dataType, ' '), EMPTY_STRING);
        str += commonDataTemplates.reduce((accumulator, c) => accumulator += c.dataWithType(dataType, ' '), EMPTY_STRING);
        return str;
    };

    const toBinary = () => {
        return dataWithType(DATA_TYPE.BINARY);
    };

    const rawData = () => {
        return dataWithType(DATA_TYPE.RAW);
    };

    const generatePayload = () => {
        let template = EMPTY_STRING;
        template += buildFormat(PAYLOAD.IDPayloadFormatIndicator, toHex(dataPayloadFormatIndicator));
        template += applicationTemplates.reduce((accumulator, a) => accumulator += a.format(), EMPTY_STRING);
        template += commonDataTemplates.reduce((accumulator, c) => accumulator += c.format(), EMPTY_STRING);
        return Buffer.from(template, 'hex').toString('base64');
    };

    return {
        setDataPayloadFormatIndicator,
        addApplicationTemplate,
        addCommonDataTemplate,
        generatePayload,
        toBinary,
        rawData
    };
};

const ApplicationTemplate = (
    berTLV = BERTLV(),
    applicationSpecificTransparentTemplates = [] // 63
) => {
    const setBERTLV = (value) => {
        berTLV = value;
    };

    const addApplicationSpecificTransparentTemplate = (value) => {
        applicationSpecificTransparentTemplates.push(value);
    };

    const dataWithType = (dataType, indent) => {
        let str = EMPTY_STRING;
        str += berTLV.dataWithType(dataType, indent);
        str += applicationSpecificTransparentTemplates.reduce((accumulator, a) => accumulator += a.dataWithType(dataType, indent), EMPTY_STRING);
        return formatDataWithTypeTemplate(PAYLOAD.IDApplicationTemplate, dataType, str);
    };

    const format = () => {
        let template = EMPTY_STRING;
        template += berTLV.format();
        template += applicationSpecificTransparentTemplates.reduce((accumulator, a) => accumulator += a.format(), EMPTY_STRING);
        return buildFormat(PAYLOAD.IDApplicationTemplate, template);
    };

    return {
        setBERTLV,
        addApplicationSpecificTransparentTemplate,
        format,
        dataWithType,
    };
};

const CommonDataTemplate = (
    berTLV = BERTLV(),
    commonDataTransparentTemplates = [] // 64
) => {
    const setBERTLV = (value) => {
        berTLV = value;
    };

    const addCommonDataTransparentTemplate = (value) => {
        commonDataTransparentTemplates.push(value);
    };

    const dataWithType = (dataType, indent) => {
        let str = EMPTY_STRING;
        str += berTLV.dataWithType(dataType, ' ');
        str += commonDataTransparentTemplates.reduce((accumulator, c) => accumulator += c.dataWithType(dataType, ' '), EMPTY_STRING);
        return formatDataWithTypeTemplate(PAYLOAD.IDCommonDataTemplate, dataType, str);
    };

    const format = () => {
        let template = EMPTY_STRING;
        template = berTLV.format();
        template += commonDataTransparentTemplates.reduce((accumulator, c) => accumulator += c.format(), EMPTY_STRING);
        return buildFormat(PAYLOAD.IDCommonDataTemplate, template);
    };

    return {
        setBERTLV,
        addCommonDataTransparentTemplate,
        format,
        dataWithType,
    };
};

const CommonDataTransparentTemplate = (
    berTLV = BERTLV()
) => {
    const setBERTLV = (value) => {
        berTLV = value;
    };

    const dataWithType = (dataType, indent) => {
        let str = EMPTY_STRING;
        str += berTLV.dataWithType(dataType, indent + indent);
        return indent + formatDataWithTypeTemplate(PAYLOAD.IDCommonDataTransparentTemplate, dataType, str);
    };

    const format = () => {
        const template = berTLV.format();
        return buildFormat(PAYLOAD.IDCommonDataTransparentTemplate, template);
    };

    return {
        setBERTLV,
        format,
        dataWithType,
    };
};

const ApplicationSpecificTransparentTemplate = (
    berTLV = BERTLV()
) => {
    const setBERTLV = (value) => {
        berTLV = value;
    };

    const dataWithType = (dataType, indent) => {
        let str = EMPTY_STRING;
        str += berTLV.dataWithType(dataType, indent + indent);
        return indent + formatDataWithTypeTemplate(PAYLOAD.IDApplicationSpecificTransparentTemplate, dataType, str);
    };

    const format = () => {
        const template = berTLV.format();
        return buildFormat(PAYLOAD.IDApplicationSpecificTransparentTemplate, template);
    };

    return {
        setBERTLV,
        format,
        dataWithType,
    };
};

const BERTLV = (
    dataApplicationDefinitionFileName = EMPTY_STRING, // "4F"
    dataApplicationLabel = EMPTY_STRING, // "50"
    dataTrack2EquivalentData = EMPTY_STRING, // "57"
    dataApplicationPAN = EMPTY_STRING, // "5A"
    dataCardholderName = EMPTY_STRING, // "5F20"
    dataLanguagePreference = EMPTY_STRING, // "5F2D"
    dataIssuerURL = EMPTY_STRING, // "5F50"
    dataApplicationVersionNumber = EMPTY_STRING, // "9F08"
    dataIssuerApplicationData = EMPTY_STRING, // "9F10"
    dataTokenRequestorID = EMPTY_STRING, // "9F19"
    dataPaymentAccountReference = EMPTY_STRING, // "9F24"
    dataLast4DigitsOfPAN = EMPTY_STRING, // "9F25"
    dataApplicationCryptogram = EMPTY_STRING, // "9F26"
    dataApplicationTransactionCounter = EMPTY_STRING, // "9F36"
    dataUnpredictableNumber = EMPTY_STRING, // "9F37"
) => {
    const dataWithType = (dataType, indent) => {
        let str = EMPTY_STRING;
        str += formatDataWithType(dataType, indent, buildFormat(TAG.TagApplicationDefinitionFileName, dataApplicationDefinitionFileName));
        str += formatDataWithType(dataType, indent, buildFormat(TAG.TagApplicationLabel, toHex(dataApplicationLabel)));
        str += formatDataWithType(dataType, indent, buildFormat(TAG.TagTrack2EquivalentData, dataTrack2EquivalentData));
        str += formatDataWithType(dataType, indent, buildFormat(TAG.TagApplicationPAN, dataApplicationPAN));
        str += formatDataWithType(dataType, indent, buildFormat(TAG.TagCardholderName, toHex(dataCardholderName)));
        str += formatDataWithType(dataType, indent, buildFormat(TAG.TagLanguagePreference, toHex(dataLanguagePreference)));
        str += formatDataWithType(dataType, indent, buildFormat(TAG.TagIssuerURL, toHex(dataIssuerURL)));
        str += formatDataWithType(dataType, indent, buildFormat(TAG.TagApplicationVersionNumber, dataApplicationVersionNumber));
        str += formatDataWithType(dataType, indent, buildFormat(TAG.TagIssuerApplicationData, dataIssuerApplicationData));
        str += formatDataWithType(dataType, indent, buildFormat(TAG.TagTokenRequestorID, dataTokenRequestorID));
        str += formatDataWithType(dataType, indent, buildFormat(TAG.TagPaymentAccountReference, dataPaymentAccountReference));
        str += formatDataWithType(dataType, indent, buildFormat(TAG.TagLast4DigitsOfPAN, dataLast4DigitsOfPAN));
        str += formatDataWithType(dataType, indent, buildFormat(TAG.TagApplicationCryptogram, dataApplicationCryptogram));
        str += formatDataWithType(dataType, indent, buildFormat(TAG.TagApplicationTransactionCounter, dataApplicationTransactionCounter));
        str += formatDataWithType(dataType, indent, buildFormat(TAG.TagUnpredictableNumber, dataUnpredictableNumber));
        return str;
    };

    const setDataApplicationDefinitionFileName = (value) => {
        dataApplicationDefinitionFileName = value;
    };

    const setDataApplicationLabel = (value) => {
        dataApplicationLabel = value;
    };

    const setDataTrack2EquivalentData = (value) => {
        dataTrack2EquivalentData = value;
    };

    const setDataApplicationPAN = (value) => {
        dataApplicationPAN = value;
    };

    const setDataCardholderName = (value) => {
        dataCardholderName = value;
    };

    const setDataLanguagePreference = (value) => {
        dataLanguagePreference = value;
    };

    const setDataIssuerURL = (value) => {
        dataIssuerURL = value;
    };

    const setDataApplicationVersionNumber = (value) => {
        dataApplicationVersionNumber = value;
    };

    const setDataIssuerApplicationData = (value) => {
        dataIssuerApplicationData = value;
    };

    const setDataTokenRequestorID = (value) => {
        dataTokenRequestorID = value;
    };

    const setDataPaymentAccountReference = (value) => {
        dataPaymentAccountReference = value;
    };

    const setDataLast4DigitsOfPAN = (value) => {
        dataLast4DigitsOfPAN = value;
    };

    const setDataApplicationCryptogram = (value) => {
        dataApplicationCryptogram = value;
    };

    const setDataApplicationTransactionCounter = (value) => {
        dataApplicationTransactionCounter = value;
    };

    const setDataUnpredictableNumber = (value) => {
        dataUnpredictableNumber = value;
    };

    const format = () => {
        let template = EMPTY_STRING;
        template += buildFormat(TAG.TagApplicationDefinitionFileName, dataApplicationDefinitionFileName);
        template += buildFormat(TAG.TagApplicationLabel, toHex(dataApplicationLabel));
        template += buildFormat(TAG.TagTrack2EquivalentData, dataTrack2EquivalentData);
        template += buildFormat(TAG.TagApplicationPAN, dataApplicationPAN);
        template += buildFormat(TAG.TagCardholderName, toHex(dataCardholderName));
        template += buildFormat(TAG.TagLanguagePreference, toHex(dataLanguagePreference));
        template += buildFormat(TAG.TagIssuerURL, toHex(dataIssuerURL));
        template += buildFormat(TAG.TagApplicationVersionNumber, dataApplicationVersionNumber);
        template += buildFormat(TAG.TagIssuerApplicationData, dataIssuerApplicationData);
        template += buildFormat(TAG.TagTokenRequestorID, dataTokenRequestorID);
        template += buildFormat(TAG.TagPaymentAccountReference, dataPaymentAccountReference);
        template += buildFormat(TAG.TagLast4DigitsOfPAN, dataLast4DigitsOfPAN);
        template += buildFormat(TAG.TagApplicationCryptogram, dataApplicationCryptogram);
        template += buildFormat(TAG.TagApplicationTransactionCounter, dataApplicationTransactionCounter);
        template += buildFormat(TAG.TagUnpredictableNumber, dataUnpredictableNumber);
        return template;
    };

    return {
        setDataApplicationDefinitionFileName,
        setDataApplicationLabel,
        setDataTrack2EquivalentData,
        setDataApplicationPAN,
        setDataCardholderName,
        setDataLanguagePreference,
        setDataIssuerURL,
        setDataApplicationVersionNumber,
        setDataIssuerApplicationData,
        setDataTokenRequestorID,
        setDataPaymentAccountReference,
        setDataLast4DigitsOfPAN,
        setDataApplicationCryptogram,
        setDataApplicationTransactionCounter,
        setDataUnpredictableNumber,
        format,
        dataWithType,
    };
};

const hexLength = (value) => {
    const length = value.length / 2;
    const lengthStr = '00' + length.toString(16).toUpperCase();
    return lengthStr.substring(lengthStr.length - 2);
};

const buildFormat = (id, value) => {
    if (value || value !== EMPTY_STRING) {
        const length = hexLength(value);
        return id + length + value;
    }
    return EMPTY_STRING;
};

const toHex = (s) => {
    return Buffer.from(s).toString('hex').toUpperCase();
};

const formatDataWithType = (dataType, indent, value) => {
    if (value && value !== '') {
        if (dataType === DATA_TYPE.BINARY) {
            const REGEX_PATTERN = /(.{2})/g;
            let hexArray = value.match(REGEX_PATTERN);
            hexArray = hexArray || [];

            return indent + hexArray.join(' ') + '\n';
        }
        else if (dataType === DATA_TYPE.RAW) {
            return indent + value + '\n';
        }
    }
    return EMPTY_STRING;
};

const formatDataWithTypeTemplate = (id, dataType, value) => {
    const length = hexLength(value.replace(/(\r\n|\n|\r| )/gm, ''));
    if (dataType === DATA_TYPE.BINARY) {
        return `${id} ${length}\n${value}`;
    }
    else if (dataType === DATA_TYPE.RAW) {
        return `${id}${length}\n${value}`;
    }
};

module.exports = {
    ApplicationTemplate,
    ApplicationSpecificTransparentTemplate,
    BERTLV,
    CommonDataTemplate,
    CommonDataTransparentTemplate,
    EMVQR,

    Constants: {
        DATA_TYPE,
        PAYLOAD,
        TAG,
    },
};
