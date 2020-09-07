const { expect } = require('chai');
const QRCODES = require('../qrcodes/merchant');

const {
    Merchant
} = require('../../index');

describe('Merchant Service', () => {
    describe('EMVQR with Complete information', () => {
        let emv_qrcode;

        before(() => {
            emv_qrcode = Merchant.buildEMVQR();

            emv_qrcode.setPayloadFormatIndicator('01');
            emv_qrcode.setPointOfInitiationMethod('12');
            emv_qrcode.setMerchantCategoryCode('4111');
            emv_qrcode.setTransactionAmount('23.72');
            emv_qrcode.setTransactionCurrency('156');
            emv_qrcode.setCountryCode('CN');
            emv_qrcode.setMerchantName('BEST TRANSPORT');
            emv_qrcode.setMerchantCity('BEIJING');
            emv_qrcode.setCRC('A13A');

            let merchantAccountInformation = Merchant.buildMerchantAccountInformation();
            merchantAccountInformation.setGloballyUniqueIdentifier('D15600000000');
            merchantAccountInformation.addPaymentNetworkSpecific('05', 'A93FO3230Q');
            emv_qrcode.addMerchantAccountInformation('29', merchantAccountInformation);

            merchantAccountInformation = Merchant.buildMerchantAccountInformation();
            merchantAccountInformation.setGloballyUniqueIdentifier('D15600000001');
            merchantAccountInformation.addPaymentNetworkSpecific('03', '12345678');
            emv_qrcode.addMerchantAccountInformation('31', merchantAccountInformation);

            const merchantInformationLanguageTemplate = Merchant.buildMerchantInformationLanguageTemplate();
            merchantInformationLanguageTemplate.setLanguagePreference('ZH');
            merchantInformationLanguageTemplate.setMerchantName('最佳运输');
            merchantInformationLanguageTemplate.setMerchantCity('北京');
            emv_qrcode.setMerchantInformationLanguageTemplate(merchantInformationLanguageTemplate);

            emv_qrcode.setTipOrConvenienceIndicator('01');

            const additionalDataFieldTemplate = Merchant.buildAdditionalDataFieldTemplate();
            additionalDataFieldTemplate.setStoreLabel('1234');
            additionalDataFieldTemplate.setCustomerLabel('***');
            additionalDataFieldTemplate.setTerminalLabel('A6008667');
            additionalDataFieldTemplate.setAdditionalConsumerDataRequest('ME');
            emv_qrcode.setAdditionalDataFieldTemplate(additionalDataFieldTemplate);

            const unreservedTemplate = Merchant.buildUnreservedTemplate();
            unreservedTemplate.setGloballyUniqueIdentifier('A011223344998877');
            unreservedTemplate.addContextSpecificData('07', '12345678');
            emv_qrcode.addUnreservedTemplates('91', unreservedTemplate);
        });

        it('should return the expected payload', async () => {
            const qrcode_expected = QRCODES._1.toString();
            expect(true).to.equal(emv_qrcode.validate());
            expect(qrcode_expected).to.equal(emv_qrcode.generatePayload());
        });
    });

    describe('EMVQR static information', () => {
        let emv_qrcode;

        before(() => {
            emv_qrcode = Merchant.buildEMVQR();

            emv_qrcode.setPayloadFormatIndicator('01');
            emv_qrcode.setPointOfInitiationMethod('11');
            emv_qrcode.setMerchantCategoryCode('0000');
            emv_qrcode.setTransactionCurrency('986');
            emv_qrcode.setCountryCode('BR');
            emv_qrcode.setMerchantName('FULANO DE TAL');
            emv_qrcode.setMerchantCity('BRASILIA');
            // emv_qrcode.setCRC('DFE3');

            const merchantAccountInformation = Merchant.buildMerchantAccountInformation();
            merchantAccountInformation.setGloballyUniqueIdentifier('br.gov.bcb.spi');
            merchantAccountInformation.addPaymentNetworkSpecific('01', 'fulano2019@example.com');
            emv_qrcode.addMerchantAccountInformation('26', merchantAccountInformation);
        });

        it('should return a valid qrcode', async () => {
            const qrcode_expected = QRCODES._5.toString();
            expect(true).to.equal(emv_qrcode.validate());
            expect(qrcode_expected).to.equal(emv_qrcode.generatePayload());
        });

        it('should return the expected rawData', async () => {
            const raw_expected = QRCODES._5.rawData();
            expect(true).to.equal(emv_qrcode.validate());
            expect(raw_expected).to.equal(emv_qrcode.rawData());
        });
    });

    describe('EMVQR static information with 3 CRC numbers', () => {
        let emv_qrcode;

        before(() => {
            emv_qrcode = Merchant.buildEMVQR();

            emv_qrcode.setPayloadFormatIndicator('01');
            emv_qrcode.setPointOfInitiationMethod('12');
            emv_qrcode.setMerchantCategoryCode('4829');
            emv_qrcode.setTransactionCurrency('032');
            emv_qrcode.setTransactionAmount('1.0');
            emv_qrcode.setCountryCode('AR');
            emv_qrcode.setMerchantName('Ruth Araceli Fetter Alcala');
            emv_qrcode.setMerchantCity('CABA');
            emv_qrcode.setPostalCode('C1038 AAH');
            // emv_qrcode.setCRC('076B');

            const merchantAccountInformation = Merchant.buildMerchantAccountInformation();
            merchantAccountInformation.setGloballyUniqueIdentifier('com.witta.merchant');
            merchantAccountInformation.addPaymentNetworkSpecific('01', '10035');
            merchantAccountInformation.addPaymentNetworkSpecific('02', '27335265287');
            merchantAccountInformation.addPaymentNetworkSpecific('03', '+5491156720969');
            emv_qrcode.addMerchantAccountInformation('26', merchantAccountInformation);
        });

        it('should return a valid qrcode', async () => {
            const qrcode_expected = QRCODES._7.toString();
            expect(true).to.equal(emv_qrcode.validate());
            expect(qrcode_expected).to.equal(emv_qrcode.generatePayload());
        });

        it('should return the expected rawData', async () => {
            const raw_expected = QRCODES._7.rawData();
            expect(true).to.equal(emv_qrcode.validate());
            expect(raw_expected).to.equal(emv_qrcode.rawData());
        });
    });

    describe('EMVQR dynamic information', () => {
        let emv_qrcode;

        before(() => {
            emv_qrcode = Merchant.buildEMVQR();

            emv_qrcode.setPayloadFormatIndicator('01');
            emv_qrcode.setPointOfInitiationMethod('12');
            emv_qrcode.setMerchantCategoryCode('0000');
            emv_qrcode.setTransactionAmount('123.45');
            emv_qrcode.setTransactionCurrency('986');
            emv_qrcode.setCountryCode('BR');
            emv_qrcode.setMerchantName('FULANO DE TAL');
            emv_qrcode.setMerchantCity('BRASILIA');
            emv_qrcode.setCRC('34D1');

            const merchantAccountInformation = Merchant.buildMerchantAccountInformation();
            merchantAccountInformation.setGloballyUniqueIdentifier('br.gov.bcb.spi');
            merchantAccountInformation.addPaymentNetworkSpecific('21', '12345678');
            merchantAccountInformation.addPaymentNetworkSpecific('22', '1234');
            merchantAccountInformation.addPaymentNetworkSpecific('23', '12345678');
            merchantAccountInformation.addPaymentNetworkSpecific('24', '00112233445566778899');
            emv_qrcode.addMerchantAccountInformation('26', merchantAccountInformation);

            const additionalDataFieldTemplate = Merchant.buildAdditionalDataFieldTemplate();
            additionalDataFieldTemplate.setReferenceLabel('RP12345678-2019');
            emv_qrcode.setAdditionalDataFieldTemplate(additionalDataFieldTemplate);

            const unreservedTemplate = Merchant.buildUnreservedTemplate();
            unreservedTemplate.setGloballyUniqueIdentifier('br.gov.bcb.spi');
            unreservedTemplate.addContextSpecificData('25', 'bx.com.br/spi/U0VHUkVET1RPVEFMTUVOVEVBTEVBVE9SSU8=');
            emv_qrcode.addUnreservedTemplates('80', unreservedTemplate);
        });

        it('should return a valid qrcode', async () => {
            const qrcode_expected = QRCODES._6.toString();
            expect(true).to.equal(emv_qrcode.validate());
            expect(qrcode_expected).to.equal(emv_qrcode.generatePayload());
        });

        it('should return the expected rawData', async () => {
            const raw_expected = QRCODES._6.rawData();
            expect(true).to.equal(emv_qrcode.validate());
            expect(raw_expected).to.equal(emv_qrcode.rawData());
        });
    });

    describe('EMVQR without Transaction Amount', () => {
        let emv_qrcode;

        before(() => {
            emv_qrcode = Merchant.buildEMVQR();

            emv_qrcode.setPayloadFormatIndicator('01');
            emv_qrcode.setPointOfInitiationMethod('11');
            emv_qrcode.setMerchantCategoryCode('6016');
            emv_qrcode.setTransactionCurrency('608');
            emv_qrcode.setCountryCode('PH');
            emv_qrcode.setMerchantName('PayMaya User');
            emv_qrcode.setMerchantCity('Mandaluyong');
            emv_qrcode.setCRC('75C3');

            const merchantAccountInformation = Merchant.buildMerchantAccountInformation();
            merchantAccountInformation.setGloballyUniqueIdentifier('com.p2pqrpay');
            merchantAccountInformation.addPaymentNetworkSpecific('01', 'PAPHPHM1XXX');
            merchantAccountInformation.addPaymentNetworkSpecific('02', '99964403');
            merchantAccountInformation.addPaymentNetworkSpecific('04', '09985903943');
            merchantAccountInformation.addPaymentNetworkSpecific('05', '+639985903943');

            emv_qrcode.addMerchantAccountInformation('27', merchantAccountInformation);
        });

        it('should return the expected payload', async () => {
            const qrcode_expected = QRCODES._2.toString();
            expect(true).to.equal(emv_qrcode.validate());
            expect(qrcode_expected).to.equal(emv_qrcode.generatePayload());
        });

        it('should return the expected rawData', async () => {
            const raw_expected = QRCODES._2.rawData();
            expect(true).to.equal(emv_qrcode.validate());
            expect(raw_expected).to.equal(emv_qrcode.rawData());
        });

        it('should return the expected binary data', () => {
            const binary_expected = QRCODES._2.toBinary();

            expect(true).to.equal(emv_qrcode.validate());
            expect(binary_expected).to.equal(emv_qrcode.toBinary());
        });
    });

    describe('EMVQR with Transaction Amount', () => {
        let emv_qrcode;

        before(() => {
            emv_qrcode = Merchant.buildEMVQR();

            emv_qrcode.setPayloadFormatIndicator('01');
            emv_qrcode.setPointOfInitiationMethod('11');
            emv_qrcode.setMerchantCategoryCode('6016');
            emv_qrcode.setTransactionCurrency('608');
            emv_qrcode.setTransactionAmount('390.8');
            emv_qrcode.setCountryCode('PH');
            emv_qrcode.setMerchantName('PayMaya User');
            emv_qrcode.setMerchantCity('Mandaluyong');
            emv_qrcode.setCRC('75C3');

            const merchantAccountInformation = Merchant.buildMerchantAccountInformation();
            merchantAccountInformation.setGloballyUniqueIdentifier('com.p2pqrpay');
            merchantAccountInformation.addPaymentNetworkSpecific('01', 'PAPHPHM1XXX');
            merchantAccountInformation.addPaymentNetworkSpecific('02', '99964403');
            merchantAccountInformation.addPaymentNetworkSpecific('04', '09985903943');
            merchantAccountInformation.addPaymentNetworkSpecific('05', '+639985903943');

            emv_qrcode.addMerchantAccountInformation('27', merchantAccountInformation);
        });

        it('should return the expected payload', async () => {
            const qrcode_expected = QRCODES._3.toString();
            expect(true).to.equal(emv_qrcode.validate());
            expect(qrcode_expected).to.equal(emv_qrcode.generatePayload());
        });

        it('should return the expected rawData', async () => {
            const raw_expected = QRCODES._3.rawData();
            expect(true).to.equal(emv_qrcode.validate());
            expect(raw_expected).to.equal(emv_qrcode.rawData());
        });

        it('should return the expected binary data', () => {
            const binary_expected = QRCODES._3.toBinary();

            expect(true).to.equal(emv_qrcode.validate());
            expect(binary_expected).to.equal(emv_qrcode.toBinary());
        });
    });

    describe('Parser - EMV string to EMVQR Object', () => {
        let emv_qrcode_expected;

        before(() => {
            emv_qrcode_expected = Merchant.buildEMVQR();

            emv_qrcode_expected.setPayloadFormatIndicator('01');
            emv_qrcode_expected.setPointOfInitiationMethod('11');
            emv_qrcode_expected.setMerchantCategoryCode('6016');
            emv_qrcode_expected.setTransactionCurrency('608');
            emv_qrcode_expected.setTransactionAmount('390.8');
            emv_qrcode_expected.setCountryCode('PH');
            emv_qrcode_expected.setMerchantName('PayMaya User');
            emv_qrcode_expected.setMerchantCity('Mandaluyong');
            emv_qrcode_expected.setCRC('75C3');

            const merchantAccountInformation = Merchant.buildMerchantAccountInformation();
            merchantAccountInformation.setGloballyUniqueIdentifier('com.p2pqrpay');
            merchantAccountInformation.addPaymentNetworkSpecific('01', 'PAPHPHM1XXX');
            merchantAccountInformation.addPaymentNetworkSpecific('02', '99964403');
            merchantAccountInformation.addPaymentNetworkSpecific('04', '09985903943');
            merchantAccountInformation.addPaymentNetworkSpecific('05', '+639985903943');

            emv_qrcode_expected.addMerchantAccountInformation('27', merchantAccountInformation);
        });

        it('should return the expected EMVQR object', () => {
            const qrcode = QRCODES._3.toString();
            const emv_qrcode = Merchant.Parser.toEMVQR(qrcode);
            expect(true).to.equal(emv_qrcode.validate());
            expect(emv_qrcode_expected.generatePayload()).to.equal(emv_qrcode.generatePayload());
        });

        it('should return a EMVQR object with binary data', () => {
            const emv_qrcode = Merchant.Parser.toEMVQR(QRCODES._4.toString());
            const binary_expected = QRCODES._4.toBinary();

            expect(true).to.equal(emv_qrcode.validate());
            expect(binary_expected).to.equal(emv_qrcode.toBinary());
        });
    });
});
