const { expect } = require('chai');
const QRCODES = require('../qrcodes/consumer');

const {
    Consumer
} = require('../../index');

describe('Consumer Service', () => {
    describe('EMVQR with Complete information', () => {
        let emv_qrcode;

        before(() => {
            emv_qrcode = Consumer.buildEMVQR();
            emv_qrcode.setDataPayloadFormatIndicator('CPV01');

            const applicationTemplate1 = Consumer.buildApplicationTemplate();

            const berTLV1 = Consumer.buildBERTLV();
            berTLV1.setDataApplicationDefinitionFileName('A0000000555555');
            berTLV1.setDataApplicationLabel('Product1');
            applicationTemplate1.setBERTLV(berTLV1);
            emv_qrcode.addApplicationTemplate(applicationTemplate1);

            const applicationTemplate2 = Consumer.buildApplicationTemplate();

            const berTLV2 = Consumer.buildBERTLV();
            berTLV2.setDataApplicationDefinitionFileName('A0000000666666');
            berTLV2.setDataApplicationLabel('Product2');
            applicationTemplate2.setBERTLV(berTLV2);
            emv_qrcode.addApplicationTemplate(applicationTemplate2);

            const commonDataTemplate = Consumer.buildCommonDataTemplate();

            const berTLV3 = Consumer.buildBERTLV();
            berTLV3.setDataApplicationPAN('1234567890123458');
            berTLV3.setDataCardholderName('CARDHOLDER/EMV');
            berTLV3.setDataLanguagePreference('ruesdeen');
            commonDataTemplate.setBERTLV(berTLV3);

            const commonDataTransparentTemplate = Consumer.buildCommonDataTransparentTemplate();

            const berTLV4 = Consumer.buildBERTLV();
            berTLV4.setDataIssuerApplicationData('06010A03000000');
            berTLV4.setDataApplicationCryptogram('584FD385FA234BCC');
            berTLV4.setDataApplicationTransactionCounter('0001');
            berTLV4.setDataUnpredictableNumber('6D58EF13');
            commonDataTransparentTemplate.setBERTLV(berTLV4);

            commonDataTemplate.addCommonDataTransparentTemplate(commonDataTransparentTemplate);

            emv_qrcode.addCommonDataTemplate(commonDataTemplate);
        });

        it('should return the expected payload in \'base64\' format', async () => {
            expect(QRCODES._1.toString()).to.equal(emv_qrcode.generatePayload());
        });

        it('should return the expected payload in \'raw\' format', async () => {
            expect(QRCODES._1.rawData()).to.equal(emv_qrcode.rawData());
        });

        it('should return the expected payload in \'binary\' format', async () => {
            expect(QRCODES._1.toBinary()).to.equal(emv_qrcode.toBinary());
        });
    });
});
