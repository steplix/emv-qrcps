const Merchant = require('./qrcode/merchant');
const Consumer = require('./qrcode/consumer');

module.exports = {
    Merchant: {
        /**
         * Builder Objects
         */
        buildTLV: Merchant.TLV,
        buildAdditionalDataFieldTemplate: Merchant.AdditionalDataFieldTemplate,
        buildEMVQR: Merchant.EMVQR,
        buildMerchantInformationLanguageTemplate: Merchant.MerchantInformationLanguageTemplate,
        buildMerchantAccountInformation: Merchant.MerchantAccountInformation,
        buildPaymentSystemSpecific: Merchant.PaymentSystemSpecific,
        buildUnreservedTemplate: Merchant.UnreservedTemplate,

        /**
         * QRCode Parser
         */
        Parser: Merchant.Parser,

        /**
         * All available constants
         */
        Constants: Merchant.Constants,
    },

    Consumer: {
        /**
         * Builder Objects
         */
        buildApplicationTemplate: Consumer.ApplicationTemplate,
        buildApplicationSpecificTransparentTemplate: Consumer.ApplicationSpecificTransparentTemplate,
        buildBERTLV: Consumer.BERTLV,
        buildCommonDataTemplate: Consumer.CommonDataTemplate,
        buildCommonDataTransparentTemplate: Consumer.CommonDataTransparentTemplate,
        buildEMVQR: Consumer.EMVQR,

        /**
         * All available constants
         */
        Constants: Consumer.Constants,
    }
};
