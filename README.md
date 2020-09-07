This library was made to help people that are using NodeJS to generate and parse EMV QRcode according with the specifications:

- Merchant [Specification](https://www.emvco.com/wp-content/plugins/pmpro-customizations/oy-getfile.php?u=/wp-content/uploads/documents/EMVCo-Merchant-Presented-QR-Specification-v1-1.pdf)
- Consumer [Specification](https://www.emvco.com/wp-content/plugins/pmpro-customizations/oy-getfile.php?u=/wp-content/uploads/documents/EMVCo-Consumer-Presented-QR-Specification-v1-1.pdf)

It is a fork of Emmanuel Kiametis [library](https://www.npmjs.com/package/emv-qrcps). 

This version fixes the CRC generated in cases where the resulting code is less than 4 digits long.

# Installing

```
npm install steplix-emv-qrcps
```

# Modules

There are 2 modules in this library.

- Merchant - To work with QRCode according with the `Merchant Specification`.
- Consumer - To work with QRCode according with the `Consumer Specification`.

## Merchant Module

You can use this Module by importing:

```
const { Merchant } = require('steplix-emv-qrcps');
```

### Methods

#### buildTLV

```
const TLV = Merchant.buildTLV(tag, length, value);
```

| Parameter | Description | Type |
| ------ | ------ | ------ |
| `tag` | Payload Format Indicator | **string** |
| `length` | Point of Initiation Method | **number** |
| `value` | Merchant Account Information | **string** |

| Return Type | Description |
| ------ | ------ |
| `TLV` | It means an object that stores a **Tag** + **Lenght** + **Value**. |

#### buildEMVQR

```
const EMVQR = Merchant.buildEMVQR();

// ... OR

const EMVQR = Merchant.buildEMVQR(
    payloadFormatIndicator,
    pointOfInitiationMethod,
    merchantAccountInformation,
    merchantCategoryCode,
    transactionCurrency,
    transactionAmount,
    tipOrConvenienceIndicator,
    valueOfConvenienceFeeFixed,
    valueOfConvenienceFeePercentage,
    countryCode,
    merchantName,
    merchantCity,
    postalCode,
    additionalDataFieldTemplate,
    crc,
    merchantInformationLanguageTemplate,
    rfuForEMVCo,
    unreservedTemplates,
);
```

| Parameter | Description | Type |
| ------ | ------ | ------ |
| `payloadFormatIndicator` | Payload Format Indicator | **TLV** |
| `pointOfInitiationMethod` | Point of Initiation Method | **TLV** |
| `merchantAccountInformation` | Merchant Account Information | **map [ id(string) : MerchantAccountInformation ]** |
| `merchantCategoryCode` | Merchant Category Code | **TLV** |
| `transactionCurrency` | Transaction Currency | **TLV** |
| `transactionAmount` | Transaction Amount | **TLV** |
| `tipOrConvenienceIndicator` | Tip or Convenience Indicator | **TLV** |
| `valueOfConvenienceFeeFixed` | Value of Convenience Fee Fixed | **TLV** |
| `valueOfConvenienceFeePercentage` | Value of Convenience Fee Percentage | **TLV** |
| `countryCode` | Country Code | **TLV** |
| `merchantName` | Merchant Name | **TLV** |
| `merchantCity` | Merchant City | **TLV** |
| `postalCode` | Postal Code | **TLV** |
| `additionalDataFieldTemplate` | Additional Data Field Template | **AdditionalDataFieldTemplate** |
| `crc` | CRC | **TLV** |
| `merchantInformationLanguageTemplate` | Merchant Information - Language Template | **MerchantInformationLanguageTemplate** |
| `rfuForEMVCo` | RFU for EMVCo | **array [ TLV ]** |
| `unreservedTemplates` | Unreserved Templates | **map [ id(string) : UnreservedTemplate ]** |

| Return Type | Description |
| ------ | ------ |
| `EMVQR` | It means an object that represents an EMV QRCode. |

#### buildAdditionalDataFieldTemplate

```
const additionalDataFieldTemplate = Merchant.buildAdditionalDataFieldTemplate();

// ... OR

const additionalDataFieldTemplate = Merchant.buildAdditionalDataFieldTemplate(
    billNumber,
    mobileNumber,
    storeLabel,
    loyaltyNumber,
    referenceLabel,
    customerLabel,
    terminalLabel,
    purposeTransaction,
    additionalConsumerDataRequest,
    rfuForEMVCo,
    paymentSystemSpecific
);
```

| Parameter | Description | Type |
| ------ | ------ | ------ |
| `billNumber` | Bill Number | **TLV** |
| `mobileNumber` | Country Code | **TLV** |
| `storeLabel` | Store Label | **TLV** |
| `loyaltyNumber` | Loyalty Number | **TLV** |
| `referenceLabel` | Reference Label | **TLV** |
| `customerLabel` | Customer Label | **TLV** |
| `terminalLabel` | Terminal Label | **TLV** |
| `purposeTransaction` | Purpose of Transaction | **TLV** |
| `additionalConsumerDataRequest` | Additional Consumer Data Request | **TLV** |
| `rfuForEMVCo` | RFU for EMVCo | **array [ TLV ]** |
| `paymentSystemSpecific` | Payment System specific templates | **map [ id(string) : PaymentSystemSpecific ]** |

| Return Type | Description |
| ------ | ------ |
| `AdditionalDataFieldTemplate` | It means an object that represents an additional data field template. |

#### buildMerchantInformationLanguageTemplate

```
const merchantInformationLanguageTemplate = Merchant.buildMerchantInformationLanguageTemplate();

// ... OR

const merchantInformationLanguageTemplate = Merchant.buildMerchantInformationLanguageTemplate(
    languagePreference,
    merchantName,
    merchantCity,
    rfuForEMVCo,
);
```

| Parameter | Description | Type |
| ------ | ------ | ------ |
| `languagePreference` | Language Preference | **TLV** |
| `merchantName` | Name of the merchant | **TLV** |
| `merchantCity` | Name of the marchant city | **TLV** |
| `rfuForEMVCo` | RFU for EMVCo | **array [ TLV ]** |

| Return Type | Description |
| ------ | ------ |
| `MerchantInformationLanguageTemplate` | It means an object that represents a merchant information language template. |

#### buildMerchantAccountInformation

```
const merchantAccountInformation = Merchant.buildMerchantAccountInformation();

// ... OR

const merchantAccountInformation = Merchant.buildMerchantAccountInformation(
    globallyUniqueIdentifier,
    paymentNetworkSpecific,
);
```

| Parameter | Description | Type |
| ------ | ------ | ------ |
| `globallyUniqueIdentifier` | Globally unique identifier | **TLV** |
| `paymentNetworkSpecific` | Array of payment network specific | **array [ TLV ]** |

| Return Type | Description |
| ------ | ------ |
| `MerchantAccountInformation` | It means an object that represents a merchant account information. |

#### buildUnreservedTemplate

```
const unreservedTemplate = Merchant.buildUnreservedTemplate();

// ... OR

const unreservedTemplate = Merchant.buildUnreservedTemplate(
    globallyUniqueIdentifier,
    paymentNetworkSpecific,
);
```

| Parameter | Description | Type |
| ------ | ------ | ------ |
| `globallyUniqueIdentifier` | Globally unique identifier | **TLV** |
| `contextSpecificData` | Array of context of specific data | **array [ TLV ]** |

| Return Type | Description |
| ------ | ------ |
| `UnreservedTemplate` | It means an object that represents an unreserved template. |


### Object Types

#### TLV

Represents a **TAG** + **Length** + **Value**.

```
const { Merchant } = require('steplix-emv-qrcps');
const { Constants } = Merchant;

const tag = "01";
const value = "Example";
const length = value.length;

const TLV = Merchant.buildTLV(tag, length, value);
```

##### Methods

###### toString

```
const tlvStringFormat = TLV.toString();
```


| Return Type | Description |
| ------ | ------ |
| `string` | TLV in string format |

###### dataWithType

```
const tlvBinaryFormat = TLV.dataWithType(Constants.DATA_TYPE.BINARY, ' '); // Binary Data (shown as hex bytes)

// OR

const tlvRawFormat = TLV.dataWithType(Constants.DATA_TYPE.RAW, ' '); // Raw Data
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `dataType` | Data type value | **Constants.DATA_TYPE.`BINARY` \| Constants.DATA_TYPE.`RAW`** |
| `indent` | Indent character (Ex.: ' ') | **string** |

| Return Type | Description |
| ------ | ------ |
| `string` | TLV in binary OR raw data format |

#### MerchantAccountInformation

Represents a merchant account information.

```
const { Merchant } = require('steplix-emv-qrcps');
const { Constants } = Merchant;

const merchantAccountInformation = Merchant.buildMerchantAccountInformation();
```

##### Methods

###### toString

```
const merchantAccountInformationStringFormat = merchantAccountInformation.toString();
```


| Return Type | Description |
| ------ | ------ |
| `string` | MerchantAccountInformation in TLV string format |

###### dataWithType

```
const merchantAccountInformationBinaryFormat = merchantAccountInformation.dataWithType(Constants.DATA_TYPE.BINARY, ' '); // Binary Data (shown as hex bytes)

// OR

const merchantAccountInformationRawFormat = merchantAccountInformation.dataWithType(Constants.DATA_TYPE.RAW, ' '); // Raw Data
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `dataType` | Data type value | **Constants.DATA_TYPE.`BINARY` \| Constants.DATA_TYPE.`RAW`** |
| `indent` | Indent character (Ex.: ' ') | **string** |

| Return Type | Description |
| ------ | ------ |
| `string` | MerchantAccountInformation in TLV binary OR TLV raw data format |

###### setGloballyUniqueIdentifier

```
const value = "15600000000";

merchantAccountInformation.setGloballyUniqueIdentifier(value);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `value` | Some value | **string** |

###### addPaymentNetworkSpecific

```
const id = "03";
const value = "12345678";

merchantAccountInformation.addPaymentNetworkSpecific(id, value);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `id` | Tag ID | **string** |
| `value` | Some value | **string** |

#### MerchantInformationLanguageTemplate

Represents a merchant information language template.

```
const { Merchant } = require('steplix-emv-qrcps');
const { Constants } = Merchant;

const merchantInformationLanguageTemplate = Merchant.buildMerchantInformationLanguageTemplate();
```

##### Methods

###### toString

```
const merchantInformationLanguageTemplateStringFormat = merchantInformationLanguageTemplate.toString();
```


| Return Type | Description |
| ------ | ------ |
| `string` | MerchantInformationLanguageTemplate in TLV string format |

###### dataWithType

```
const merchantInformationLanguageTemplateBinaryFormat = merchantInformationLanguageTemplate.dataWithType(Constants.DATA_TYPE.BINARY, ' '); // Binary Data (shown as hex bytes)

// OR

const merchantInformationLanguageTemplateRawFormat = merchantInformationLanguageTemplate.dataWithType(Constants.DATA_TYPE.RAW, ' '); // Raw Data
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `dataType` | Data type value | **Constants.DATA_TYPE.`BINARY` \| Constants.DATA_TYPE.`RAW`** |
| `indent` | Indent character (Ex.: ' ') | **string** |

| Return Type | Description |
| ------ | ------ |
| `string` | MerchantInformationLanguageTemplate in TLV binary OR TLV raw data format |

###### validate

```
const isValid = merchantInformationLanguageTemplate.validate();
```

| Return Type | Description |
| ------ | ------ |
| `boolean` | True if required properties is valid otherwise throw an Error |

###### setLanguagePreference

```
const value = "PT";

merchantInformationLanguageTemplate.setLanguagePreference(value);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `value` | Some value | **string** |

###### setMerchantName

```
const value = "Merchant Organization";

merchantInformationLanguageTemplate.setMerchantName(value);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `value` | Some value | **string** |

###### setMerchantCity

```
const value = "Brasilia";

merchantInformationLanguageTemplate.setMerchantCity(value);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `value` | Some value | **string** |

###### addRFUforEMVCo

```
const id = "03";
const value = "12345678";

merchantInformationLanguageTemplate.addRFUforEMVCo(id, value);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `id` | Tag ID | **string** |
| `value` | Some value | **string** |

#### UnreservedTemplate

Represents a merchant account information.

```
const { Merchant } = require('steplix-emv-qrcps');
const { Constants } = Merchant;

const unreservedTemplate = Merchant.buildUnreservedTemplate();
```

##### Methods

###### toString

```
const unreservedTemplateStringFormat = unreservedTemplate.toString();
```


| Return Type | Description |
| ------ | ------ |
| `string` | UnreservedTemplate in TLV string format |

###### dataWithType

```
const unreservedTemplateBinaryFormat = unreservedTemplate.dataWithType(Constants.DATA_TYPE.BINARY, ' '); // Binary Data (shown as hex bytes)

// OR

const unreservedTemplateRawFormat = unreservedTemplate.dataWithType(Constants.DATA_TYPE.RAW, ' '); // Raw Data
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `dataType` | Data type value | **Constants.DATA_TYPE.`BINARY` \| Constants.DATA_TYPE.`RAW`** |
| `indent` | Indent character (Ex.: ' ') | **string** |

| Return Type | Description |
| ------ | ------ |
| `string` | UnreservedTemplate in TLV binary OR TLV raw data format |

###### setGloballyUniqueIdentifier

```
const value = "15600000000";

unreservedTemplate.setGloballyUniqueIdentifier(value);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `value` | Some value | **string** |

###### addContextSpecificData

```
const id = "03";
const value = "12345678";

unreservedTemplate.addContextSpecificData(id, value);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `id` | Tag ID | **string** |
| `value` | Some value | **string** |

#### PaymentSystemSpecific

Represents a payment system specific.

```
const { Merchant } = require('steplix-emv-qrcps');
const { Constants } = Merchant;

const paymentSystemSpecific = Merchant.buildPaymentSystemSpecific();
```

##### Methods

###### toString

```
const paymentSystemSpecificStringFormat = paymentSystemSpecific.toString();
```


| Return Type | Description |
| ------ | ------ |
| `string` | PaymentSystemSpecific in TLV string format |

###### dataWithType

```
const paymentSystemSpecificBinaryFormat = paymentSystemSpecific.dataWithType(Constants.DATA_TYPE.BINARY, ' '); // Binary Data (shown as hex bytes)

// OR

const paymentSystemSpecificRawFormat = paymentSystemSpecific.dataWithType(Constants.DATA_TYPE.RAW, ' '); // Raw Data
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `dataType` | Data type value | **Constants.DATA_TYPE.`BINARY` \| Constants.DATA_TYPE.`RAW`** |
| `indent` | Indent character (Ex.: ' ') | **string** |

| Return Type | Description |
| ------ | ------ |
| `string` | PaymentSystemSpecific in TLV binary OR TLV raw data format |

###### setGloballyUniqueIdentifier

```
const value = "15600000000";

paymentSystemSpecific.setGloballyUniqueIdentifier(value);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `value` | Some value | **string** |

###### addPaymentSystemSpecific

```
const id = "03";
const value = "12345678";

paymentSystemSpecific.addPaymentSystemSpecific(id, value);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `id` | Tag ID | **string** |
| `value` | Some value | **string** |

#### AdditionalDataFieldTemplate

Represents an additional data field template.

```
const { Merchant } = require('steplix-emv-qrcps');
const { Constants } = Merchant;

const additionalDataFieldTemplate = Merchant.buildAdditionalDataFieldTemplate();
```

##### Methods

###### toString

```
const additionalDataFieldTemplateStringFormat = additionalDataFieldTemplate.toString();
```


| Return Type | Description |
| ------ | ------ |
| `string` | AdditionalDataFieldTemplate in TLV string format |

###### dataWithType

```
const additionalDataFieldTemplateBinaryFormat = additionalDataFieldTemplate.dataWithType(Constants.DATA_TYPE.BINARY, ' '); // Binary Data (shown as hex bytes)

// OR

const additionalDataFieldTemplateRawFormat = additionalDataFieldTemplate.dataWithType(Constants.DATA_TYPE.RAW, ' '); // Raw Data
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `dataType` | Data type value | **Constants.DATA_TYPE.`BINARY` \| Constants.DATA_TYPE.`RAW`** |
| `indent` | Indent character (Ex.: ' ') | **string** |

| Return Type | Description |
| ------ | ------ |
| `string` | AdditionalDataFieldTemplate in TLV binary OR TLV raw data format |

###### setBillNumber

```
const value = "34250";

additionalDataFieldTemplate.setBillNumber(value);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `value` | Some value | **string** |


###### setMobileNumber

```
const value = "+5561991112222";

additionalDataFieldTemplate.setMobileNumber(value);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `value` | Some value | **string** |


###### setStoreLabel

```
const value = "1234";

additionalDataFieldTemplate.setStoreLabel(value);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `value` | Some value | **string** |


###### setLoyaltyNumber

```
const value = "12345";

additionalDataFieldTemplate.setLoyaltyNumber(value);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `value` | Some value | **string** |


###### setReferenceLabel

```
const value = "example";

additionalDataFieldTemplate.setReferenceLabel(value);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `value` | Some value | **string** |


###### setCustomerLabel

```
const value = "***";

additionalDataFieldTemplate.setCustomerLabel(value);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `value` | Some value | **string** |


###### setTerminalLabel

```
const value = "A6008667";

additionalDataFieldTemplate.setTerminalLabel(value);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `value` | Some value | **string** |


###### setPurposeTransaction

```
const value = "Some purpose";

additionalDataFieldTemplate.setPurposeTransaction(value);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `value` | Some value | **string** |


###### setAdditionalConsumerDataRequest

```
const value = "ME";

additionalDataFieldTemplate.setAdditionalConsumerDataRequest(value);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `value` | Some value | **string** |

###### addRFUforEMVCo

```
const id = "03";
const value = "12345678";

additionalDataFieldTemplate.addRFUforEMVCo(id, value);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `id` | Tag ID | **string** |
| `value` | Some value | **string** |

###### addPaymentSystemSpecific

```
const id = "03";
const value = Merchant.buildPaymentSystemSpecific();
value.setGloballyUniqueIdentifier("15600000000");
value.addPaymentSystemSpecific("03", "12345678");

additionalDataFieldTemplate.addPaymentSystemSpecific(id, value);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `id` | Tag ID | **string** |
| `value` | Some value | **string** |

#### EMVQR

Represents an EMV QRCode.

```
const { Merchant } = require('steplix-emv-qrcps');
const { Constants } = Merchant;

const emvqr = Merchant.buildEMVQR();
```

##### Methods

###### generatePayload

```
const emvqrStringFormat = emvqr.generatePayload();
```


| Return Type | Description |
| ------ | ------ |
| `string` | EMV QRCode payload in string format. |

###### dataWithType

```
const emvqrBinaryFormat = emvqr.dataWithType(Constants.DATA_TYPE.BINARY, ' '); // Binary Data (shown as hex bytes)

// OR

const emvqrRawFormat = emvqr.dataWithType(Constants.DATA_TYPE.RAW, ' '); // Raw Data
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `dataType` | Data type value | **Constants.DATA_TYPE.`BINARY` \| Constants.DATA_TYPE.`RAW`** |
| `indent` | Indent character (Ex.: ' ') | **string** |

| Return Type | Description |
| ------ | ------ |
| `string` | EMV QRCode in binary OR raw data format |

###### toBinary

```
const emvqrBinaryFormat = emvqr.toBinary(); // Binary Data (shown as hex bytes)
```

| Return Type | Description |
| ------ | ------ |
| `string` | EMV QRCode in binary format |

###### rawData

```
const emvqrBinaryFormat = emvqr.rawData(); // Raw Data
```

| Return Type | Description |
| ------ | ------ |
| `string` | EMV QRCode in raw data format |

###### validate

```
const isValid = emvqr.validate();
```

| Return Type | Description |
| ------ | ------ |
| `boolean` | True if required properties is valid otherwise throw an Error |

###### setPayloadFormatIndicator

```
const value = "01";

emvqr.setPayloadFormatIndicator(value);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `value` | Some value | **string** |


###### setPointOfInitiationMethod

```
const value = "00";

emvqr.setPointOfInitiationMethod(value);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `value` | Some value | **string** |


###### setMerchantCategoryCode

```
const value = "Technology";

emvqr.setMerchantCategoryCode(value);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `value` | Some value | **string** |


###### setTransactionCurrency

```
const value = "BRL";

emvqr.setTransactionCurrency(value);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `value` | Some value | **string** |


###### setTransactionAmount

```
const value = "20.5";

emvqr.setTransactionAmount(value);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `value` | Some value | **string** |


###### setTipOrConvenienceIndicator

```
const value = "2";

emvqr.setTipOrConvenienceIndicator(value);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `value` | Some value | **string** |


###### setValueOfConvenienceFeeFixed

```
const value = "2.00";

emvqr.setValueOfConvenienceFeeFixed(value);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `value` | Some value | **string** |


###### setValueOfConvenienceFeePercentage

```
const value = "0.90";

emvqr.setValueOfConvenienceFeePercentage(value);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `value` | Some value | **string** |


###### setCountryCode

```
const value = "55";

emvqr.setCountryCode(value);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `value` | Some value | **string** |

###### setMerchantName

```
const value = "Merchant Organization";

emvqr.setMerchantName(value);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `value` | Some value | **string** |

###### setMerchantCity

```
const value = "Brasilia";

emvqr.setMerchantCity(value);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `value` | Some value | **string** |

###### setPostalCode

```
const value = "71715-000";

emvqr.setPostalCode(value);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `value` | Some value | **string** |

###### setCRC

```
const value = "AF35";

emvqr.setCRC(value);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `value` | Some value | **string** |

###### setAdditionalDataFieldTemplate

```
const additionalDataFieldTemplate = Merchant.buildAdditionalDataFieldTemplate();
additionalDataFieldTemplate.setStoreLabel("1234");
additionalDataFieldTemplate.setCustomerLabel("***");
additionalDataFieldTemplate.setTerminalLabel("A6008667");
additionalDataFieldTemplate.setAdditionalConsumerDataRequest("ME");

emvqr.setAdditionalDataFieldTemplate(additionalDataFieldTemplate);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `additionalDataFieldTemplate` | Some additional data field template | **AdditionalDataFieldTemplate** |

###### setMerchantInformationLanguageTemplate

```
let merchantInformationLanguageTemplate = Merchant.buildMerchantInformationLanguageTemplate();
merchantInformationLanguageTemplate.setLanguagePreference("PT");
merchantInformationLanguageTemplate.setMerchantName("Merchant Organization");
merchantInformationLanguageTemplate.setMerchantCity("Brasilia");
emvqr.setMerchantInformationLanguageTemplate(merchantInformationLanguageTemplate);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `merchantInformationLanguageTemplate` | Some merchant information language template | **MerchantInformationLanguageTemplate** |

###### addMerchantAccountInformation

```
const id = "27";

const merchantAccountInformation = Merchant.buildMerchantAccountInformation();
merchantAccountInformation.setGloballyUniqueIdentifier("com.p2pqrpay");
merchantAccountInformation.addPaymentNetworkSpecific("01", "PAPHPHM1XXX");
merchantAccountInformation.addPaymentNetworkSpecific("02", "99964403");
merchantAccountInformation.addPaymentNetworkSpecific("04", "09985903943");
merchantAccountInformation.addPaymentNetworkSpecific("05", "+639985903943");

emvqr.addMerchantAccountInformation(id, merchantAccountInformation);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `id` | Tag ID | **string** |
| `value` | Some merchant account information | **string** |

###### addUnreservedTemplates

```
const id = "80";

const unreservedTemplate = Merchant.buildUnreservedTemplate();
unreservedTemplate.setGloballyUniqueIdentifier("A011223344998877");
unreservedTemplate.addContextSpecificData("07", "12345678");

emvqr.addUnreservedTemplates(id, unreservedTemplate);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `id` | Tag ID | **string** |
| `value` | Some unreserved template | **string** |

###### addRFUforEMVCo

```
const id = "03";
const value = "12345678";

emvqr.addRFUforEMVCo(id, value);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `id` | Tag ID | **string** |
| `value` | Some value | **string** |


## Consumer Module

You can use this Module by importing:

```
const { Consumer } = require('steplix-emv-qrcps')
```

### Methods

#### buildBERTLV

```
const berTLV = Consumer.buildBERTLV();

// ... OR

const berTLV = Consumer.buildBERTLV(
    dataApplicationDefinitionFileName,
    dataApplicationLabel,
    dataTrack2EquivalentData,
    dataApplicationPAN,
    dataCardholderName,
    dataLanguagePreference,
    dataIssuerURL,
    dataApplicationVersionNumber,
    dataIssuerApplicationData,
    dataTokenRequestorID,
    dataPaymentAccountReference,
    dataLast4DigitsOfPAN,
    dataApplicationCryptogram,
    dataApplicationTransactionCounter,
    dataUnpredictableNumber
);

```

| Parameter | Description | Type |
| ------ | ------ | ------ |
| `dataApplicationDefinitionFileName` | Application Definition Name | **string(in-hex-decimal-format)** |
| `dataApplicationLabel` | Application Label | **string** |
| `dataTrack2EquivalentData` | Track to equivalent data | **string(in-hex-decimal-format)** |
| `dataApplicationPAN` | Application PAN | **string(in-hex-decimal-format)** |
| `dataCardholderName` | Cardholder Name | **string** |
| `dataLanguagePreference` | Language Preference | **string** |
| `dataIssuerURL` | Issuer URL | **string** |
| `dataApplicationVersionNumber` | Application Version Number | **string(in-hex-decimal-format)** |
| `dataIssuerApplicationData` | Issuer Application Data | **string(in-hex-decimal-format)** |
| `dataTokenRequestorID` | Token Requestor ID | **string(in-hex-decimal-format)** |
| `dataPaymentAccountReference` | Payment Account Reference | **string(in-hex-decimal-format)** |
| `dataLast4DigitsOfPAN` | Last 4 digits of PAN | **string(in-hex-decimal-format)** |
| `dataApplicationCryptogram` | Application Cryptogram | **string(in-hex-decimal-format)** |
| `dataApplicationTransactionCounter` | Application Transaction Counter | **string(in-hex-decimal-format)** |
| `dataUnpredictableNumber` | Unpredictable Number | **string(in-hex-decimal-format)** |

| Return Type | Description |
| ------ | ------ |
| `BERTLV` | It means the TLV Object of the consumer module. |

#### buildApplicationSpecificTransparentTemplate

```
const applicationSpecificTransparentTemplate = Consumer.buildApplicationSpecificTransparentTemplate();

// ... OR

const applicationSpecificTransparentTemplate = Consumer.buildApplicationSpecificTransparentTemplate(
	berTLV = BERTLV()
);


```

| Parameter | Description | Type |
| ------ | ------ | ------ |
| `berTLV` | BERTLV Object | **BERTLV** |

| Return Type | Description |
| ------ | ------ |
| `ApplicationSpecificTransparentTemplate` | It means an object that stores an application specific transparent template. |

#### buildApplicationTemplate

```
const applicationTemplate = Consumer.buildApplicationTemplate();

// ... OR

const applicationTemplate = Consumer.buildApplicationTemplate(
	berTLV = BERTLV(),
	applicationSpecificTransparentTemplates = []
);


```

| Parameter | Description | Type |
| ------ | ------ | ------ |
| `berTLV` | BERTLV Object | **BERTLV** |
| `applicationSpecificTransparentTemplates` | Application specific transparent templates | **array (ApplicationSpecificTransparentTemplate)** |

| Return Type | Description |
| ------ | ------ |
| `ApplicationTemplate` | It means an object that stores an application template. |

#### buildCommonDataTransparentTemplate

```
const commonDataTransparentTemplate = Consumer.buildCommonDataTransparentTemplate();

// ... OR

const commonDataTransparentTemplate = Consumer.buildCommonDataTransparentTemplate(
    berTLV = BERTLV()
);

```

| Parameter | Description | Type |
| ------ | ------ | ------ |
| `berTLV` | BERTLV Object | **BERTLV** |

| Return Type | Description |
| ------ | ------ |
| `CommonDataTransparentTemplate` | It means an object that stores a common data transparent template. |

#### buildCommonDataTemplate

```
const commonDataTemplate = Consumer.buildCommonDataTemplate();

// ... OR

const commonDataTemplate = Consumer.buildCommonDataTemplate(
    berTLV = BERTLV(),
	commonDataTransparentTemplates = [] 
);

```

| Parameter | Description | Type |
| ------ | ------ | ------ |
| `berTLV` | BERTLV Object | **BERTLV** |
| `commonDataTransparentTemplates` | Common data transparent templates | **array (CommonDataTransparentTemplate)** |

| Return Type | Description |
| ------ | ------ |
| `CommonDataTemplate` | It means an object that stores a common data template. |

#### buildEMVQR

```
const EMVQR = Consumer.buildEMVQR();

// ... OR

const EMVQR = Consumer.buildEMVQR(
    dataPayloadFormatIndicator,
    applicationTemplates,
    commonDataTemplates
);
```

| Parameter | Description | Type |
| ------ | ------ | ------ |
| `dataPayloadFormatIndicator` | Payload Format Indicator | **string** |
| `applicationTemplates` | Application Templates | **array [ ApplicationTemplate ]** |
| `commonDataTemplates` | Common Data templates | **array [ CommonDataTemplate ]** |

| Return Type | Description |
| ------ | ------ |
| `EMVQR` | It means an object that represents an EMV QRCode. |


### Object Types

#### BERTLV

Represents a **Basic Encoding Rules** **TAG** + **Length** + **Value**.

```
const { Consumer } = require('steplix-emv-qrcps');
const { Constants } = Merchant;

const berTLV = Merchant.buildBERTLV();
```

##### Methods

###### setDataApplicationDefinitionFileName

```
berTLV.setDataApplicationDefinitionFileName("A0000000555555");
```


| Parameters | Description | Type |
| ------ | ------ | ------ |
| `dataApplicationDefinitionFileName` | Application Definition File (ADF) Name | **string(in-hex-decimal-format)** |

###### setDataApplicationLabel

```
berTLV.setDataApplicationLabel("Product1");
```


| Parameters | Description | Type |
| ------ | ------ | ------ |
| `setDataApplicationLabel` | Application Label | **string** |

###### setDataTrack2EquivalentData

```
berTLV.setDataTrack2EquivalentData("AABBCCDD");
```


| Parameters | Description | Type |
| ------ | ------ | ------ |
| `dataTrack2EquivalentData` | Track 2 Equivalent Data | **string(in-hex-decimal-format)** |

###### setDataApplicationPAN

```
berTLV.setDataApplicationPAN("1234567890123458");
```


| Parameters | Description | Type |
| ------ | ------ | ------ |
| `dataApplicationPAN` | Application PAN | **string(in-hex-decimal-format)** |

###### setDataCardholderName

```
berTLV.setDataCardholderName("CARDHOLDER/EMV");
```


| Parameters | Description | Type |
| ------ | ------ | ------ |
| `dataCardholderName` | Cardholder Name | **string** |

###### setDataLanguagePreference

```
berTLV.setDataLanguagePreference("ruesdeen");
```


| Parameters | Description | Type |
| ------ | ------ | ------ |
| `dataLanguagePreference` | Language Preference | **string** |

###### setDataIssuerURL

```
berTLV.setDataIssuerURL("http://someuri.com");
```


| Parameters | Description | Type |
| ------ | ------ | ------ |
| `dataIssuerURL` | Issuer URL | **string** |

###### setDataApplicationVersionNumber

```
berTLV.setDataApplicationVersionNumber("04");
```


| Parameters | Description | Type |
| ------ | ------ | ------ |
| `dataApplicationVersionNumber` | Application Version Number | **string(in-hex-decimal-format)** |

###### setDataIssuerApplicationData

```
berTLV.setDataIssuerApplicationData("06010A03000000");
```


| Parameters | Description | Type |
| ------ | ------ | ------ |
| `dataIssuerApplicationData` | Issuer application data | **string(in-hex-decimal-format)** |

###### setDataTokenRequestorID

```
berTLV.setDataTokenRequestorID("0601AABBCC");
```


| Parameters | Description | Type |
| ------ | ------ | ------ |
| `dataTokenRequestorID` | Token Requestor ID | **string(in-hex-decimal-format)** |

###### setDataPaymentAccountReference

```
berTLV.setDataPaymentAccountReference("0708AABBCCDD");
```


| Parameters | Description | Type |
| ------ | ------ | ------ |
| `dataPaymentAccountReference` | Payment Account Reference | **string(in-hex-decimal-format)** |

###### setDataLast4DigitsOfPAN

```
berTLV.setDataLast4DigitsOfPAN("07080201");
```


| Parameters | Description | Type |
| ------ | ------ | ------ |
| `dataLast4DigitsOfPAN` | Last 4 Digits of PAN | **string(in-hex-decimal-format)** |

###### setDataApplicationCryptogram

```
berTLV.setDataApplicationCryptogram("584FD385FA234BCC");
```


| Parameters | Description | Type |
| ------ | ------ | ------ |
| `dataApplicationCryptogram` | Application Cryptogram | **string(in-hex-decimal-format)** |

###### setDataApplicationTransactionCounter

```
berTLV.setDataApplicationTransactionCounter("0001");
```


| Parameters | Description | Type |
| ------ | ------ | ------ |
| `dataApplicationTransactionCounter` | Application Transaction Counter | **string(in-hex-decimal-format)** |

###### setDataUnpredictableNumber

```
berTLV.setDataUnpredictableNumber("6D58EF13");
```


| Parameters | Description | Type |
| ------ | ------ | ------ |
| `dataUnpredictableNumber` | Unpredictable Number | **string(in-hex-decimal-format)** |

###### format

```
berTLV.format();
```


| Return Type | Description |
| ------ | ------ |
| `string` | BERTLV in string format |

###### dataWithType

```
const berTlvBinaryFormat = berTLV.dataWithType(Constants.DATA_TYPE.BINARY, ' '); // Binary Data (shown as hex bytes)

// OR

const berTlvRawFormat = berTLV.dataWithType(Constants.DATA_TYPE.RAW, ' '); // Raw Data
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `dataType` | Data type value | **Constants.DATA_TYPE.`BINARY` \| Constants.DATA_TYPE.`RAW`** |
| `indent` | Indent character (Ex.: ' ') | **string** |

| Return Type | Description |
| ------ | ------ |
| `string` | BERTLV in binary OR raw data format |

#### ApplicationSpecificTransparentTemplate

Represents an application specific transparent template.

```
const { Consumer } = require('steplix-emv-qrcps');
const { Constants } = Consumer;

const applicationSpecificTransparentTemplate = Consumer.buildApplicationSpecificTransparentTemplate();
```

##### Methods

###### setBERTLV

```
const berTLV = Consumer.buildBERTLV();

// Setters assignments in berTLV

applicationSpecificTransparentTemplate.setBERTLV(berTLV);
```


| Parameters | Description | Type |
| ------ | ------ | ------ |
| `berTLV` | BERTLV Object | **BERTLV** |

###### format

```
applicationSpecificTransparentTemplate.format();
```


| Return Type | Description |
| ------ | ------ |
| `string` | ApplicationSpecificTransparentTemplate in string format |

###### dataWithType

```
const binaryFormat = applicationSpecificTransparentTemplate.dataWithType(Constants.DATA_TYPE.BINARY, ' '); // Binary Data (shown as hex bytes)

// OR

const rawFormat = applicationSpecificTransparentTemplate.dataWithType(Constants.DATA_TYPE.RAW, ' '); // Raw Data
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `dataType` | Data type value | **Constants.DATA_TYPE.`BINARY` \| Constants.DATA_TYPE.`RAW`** |
| `indent` | Indent character (Ex.: ' ') | **string** |

| Return Type | Description |
| ------ | ------ |
| `string` | Application specific transparent template in binary OR raw data format |

#### CommonDataTransparentTemplate

Represents a common data transparent template.

```
const { Consumer } = require('steplix-emv-qrcps');
const { Constants } = Consumer;

const commonDataTransparentTemplate = Consumer.buildCommonDataTransparentTemplate();
```

##### Methods

###### setBERTLV

```
const berTLV = Consumer.buildBERTLV();

// Setters assignments in berTLV

commonDataTransparentTemplate.setBERTLV(berTLV);
```


| Parameters | Description | Type |
| ------ | ------ | ------ |
| `berTLV` | BERTLV Object | **BERTLV** |

###### format

```
commonDataTransparentTemplate.format();
```


| Return Type | Description |
| ------ | ------ |
| `string` | CommonDataTransparentTemplate in string format |

###### dataWithType

```
const binaryFormat = commonDataTransparentTemplate.dataWithType(Constants.DATA_TYPE.BINARY, ' '); // Binary Data (shown as hex bytes)

// OR

const rawFormat = commonDataTransparentTemplate.dataWithType(Constants.DATA_TYPE.RAW, ' '); // Raw Data
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `dataType` | Data type value | **Constants.DATA_TYPE.`BINARY` \| Constants.DATA_TYPE.`RAW`** |
| `indent` | Indent character (Ex.: ' ') | **string** |

| Return Type | Description |
| ------ | ------ |
| `string` | Common data transparent template in binary OR raw data format |

#### ApplicationTemplate

Represents an application template.

```
const { Consumer } = require('steplix-emv-qrcps');
const { Constants } = Consumer;

const applicationTemplate = Consumer.buildApplicationTemplate();
```

##### Methods

###### setBERTLV

```
const berTLV = Consumer.buildBERTLV();

// Setters assignments in berTLV

applicationTemplate.setBERTLV(berTLV);
```


| Parameters | Description | Type |
| ------ | ------ | ------ |
| `berTLV` | BERTLV Object | **BERTLV** |

###### addApplicationSpecificTransparentTemplate

```
const applicationSpecificTransparentTemplate = Consumer.buildApplicationSpecificTransparentTemplate();

const berTLV1 = Consumer.buildBERTLV();
berTLV1.setDataApplicationDefinitionFileName("A0000000555555");
berTLV1.setDataApplicationLabel("Product1");
applicationSpecificTransparentTemplate.setBERTLV(berTLV1);

applicationTemplate.addApplicationSpecificTransparentTemplate(applicationSpecificTransparentTemplate);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `applicationSpecificTransparentTemplate` | An application specific transparent template | **ApplicationSpecificTransparentTemplate** |

###### format

```
applicationTemplate.format();
```


| Return Type | Description |
| ------ | ------ |
| `string` | ApplicationTemplate in string format |

###### dataWithType

```
const binaryFormat = applicationTemplate.dataWithType(Constants.DATA_TYPE.BINARY, ' '); // Binary Data (shown as hex bytes)

// OR

const rawFormat = applicationTemplate.dataWithType(Constants.DATA_TYPE.RAW, ' '); // Raw Data
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `dataType` | Data type value | **Constants.DATA_TYPE.`BINARY` \| Constants.DATA_TYPE.`RAW`** |
| `indent` | Indent character (Ex.: ' ') | **string** |

| Return Type | Description |
| ------ | ------ |
| `string` | Common data transparent template in binary OR raw data format |

#### CommonDataTemplate

Represents a common data template.

```
const { Consumer } = require('steplix-emv-qrcps');
const { Constants } = Consumer;

const commonDataTemplate = Consumer.buildCommonDataTemplate();
```

##### Methods

###### setBERTLV

```
const berTLV = Consumer.buildBERTLV();

// Setters assignments in berTLV

commonDataTemplate.setBERTLV(berTLV);
```


| Parameters | Description | Type |
| ------ | ------ | ------ |
| `berTLV` | BERTLV Object | **BERTLV** |

###### addCommonDataTransparentTemplate

```
const commonDataTransparentTemplate = Consumer.buildCommonDataTransparentTemplate();

const berTLV = Consumer.buildBERTLV();
berTLV.setDataIssuerApplicationData("06010A03000000");
berTLV.setDataApplicationCryptogram("584FD385FA234BCC");
berTLV.setDataApplicationTransactionCounter("0001");
berTLV.setDataUnpredictableNumber("6D58EF13");
commonDataTransparentTemplate.setBERTLV(berTLV);

commonDataTemplate.addCommonDataTransparentTemplate(commonDataTransparentTemplate);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `commonDataTransparentTemplate` | A common data transparent template | **CommonDataTransparentTemplate** |

###### format

```
commonDataTemplate.format();
```


| Return Type | Description |
| ------ | ------ |
| `string` | CommonDataTemplate in string format |

###### dataWithType

```
const binaryFormat = commonDataTemplate.dataWithType(Constants.DATA_TYPE.BINARY, ' '); // Binary Data (shown as hex bytes)

// OR

const rawFormat = commonDataTemplate.dataWithType(Constants.DATA_TYPE.RAW, ' '); // Raw Data
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `dataType` | Data type value | **Constants.DATA_TYPE.`BINARY` \| Constants.DATA_TYPE.`RAW`** |
| `indent` | Indent character (Ex.: ' ') | **string** |

| Return Type | Description |
| ------ | ------ |
| `string` | Common data transparent template in binary OR raw data format |

#### EMVQR

Represents an EMV QRCode.

```
const { Consumer } = require('steplix-emv-qrcps');
const { Constants } = Consumer;

const emvqr = Consumer.buildEMVQR();
```

##### Methods

###### setDataPayloadFormatIndicator

```
emvqr.setDataPayloadFormatIndicator("CPV01");
```


| Parameters | Description | Type |
| ------ | ------ | ------ |
| `dataPayloadFormatIndicator` | Payload Format Indicator | **string** |

###### addApplicationTemplate

```
const applicationTemplate1 = Consumer.buildApplicationTemplate();
const berTLV1 = Consumer.buildBERTLV();
berTLV1.setDataApplicationDefinitionFileName("A0000000555555");
berTLV1.setDataApplicationLabel("Product1");
applicationTemplate1.setBERTLV(berTLV1);

emvqr.addApplicationTemplate(applicationTemplate1);

const applicationTemplate2 = Consumer.buildApplicationTemplate();
const berTLV2 = Consumer.buildBERTLV();
berTLV2.setDataApplicationDefinitionFileName("A0000000666666");
berTLV2.setDataApplicationLabel("Product2");
applicationTemplate2.setBERTLV(berTLV2);

emvqr.addApplicationTemplate(applicationTemplate2);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `applicationTemplate` | An application template | **ApplicationTemplate** |

###### addCommonDataTemplate

```
const commonDataTemplate = Consumer.buildCommonDataTemplate();

const berTLV1 = Consumer.buildBERTLV();
berTLV1.setDataApplicationPAN("1234567890123458");
berTLV1.setDataCardholderName("CARDHOLDER/EMV");
berTLV1.setDataLanguagePreference("ruesdeen");
commonDataTemplate.setBERTLV(berTLV1);

const commonDataTransparentTemplate = Consumer.buildCommonDataTransparentTemplate();

const berTLV2 = Consumer.buildBERTLV();
berTLV2.setDataIssuerApplicationData("06010A03000000");
berTLV2.setDataApplicationCryptogram("584FD385FA234BCC");
berTLV2.setDataApplicationTransactionCounter("0001");
berTLV2.setDataUnpredictableNumber("6D58EF13");
commonDataTransparentTemplate.setBERTLV(berTLV2);

commonDataTemplate.addCommonDataTransparentTemplate(commonDataTransparentTemplate);

emvqr.addCommonDataTemplate(commonDataTemplate);
```

| Parameters | Description | Type |
| ------ | ------ | ------ |
| `commonDataTemplate` | A common data template | **CommonDataTemplate** |

###### generatePayload

```
commonDataTemplate.generatePayload();
```


| Return Type | Description |
| ------ | ------ |
| `string` | EMVQR in base64 string format |

###### toBinary

```
const emvqrBinaryFormat = emvqr.toBinary(); // Binary Data (shown as hex bytes)
```

| Return Type | Description |
| ------ | ------ |
| `string` | EMV QRCode in binary format |

###### rawData

```
const emvqrBinaryFormat = emvqr.rawData(); // Raw Data
```

| Return Type | Description |
| ------ | ------ |
| `string` | EMV QRCode in raw data format |