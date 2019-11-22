import * as chai from 'chai';
import {Program} from '../../src/program/Program';

import {ProgramOutputStatus} from '../../src/program/ProgramOutput';



const expect = chai.expect;

describe('Should be able to parse the GitHub stats', () => {

    before(() => {

    });

    it('should parse file valid input', async () => {
        let dotProgram = new Program("valid/statsEverything.txt");
        let output = dotProgram.parse();
        // console.log(output);
        output.symbolTable.table.forEach((value: Map<string, number>, key: string) => {
            console.log(key, value);
        });
        expect(output.status).to.be.equal(ProgramOutputStatus.SUCCESS)
    });

    it('should parse file valid simple input', async () => {
        let dotProgram = new Program("valid/stats.txt");
        let output = dotProgram.parse();
        dotProgram.compile();
        expect(output.status).to.be.equal(ProgramOutputStatus.SUCCESS)
    });

    it('should not parse file non existing file', async () => {
        let dotProgram = new Program("sample.tdot");
        let output = dotProgram.parse();
        expect(output.status).to.be.equal(ProgramOutputStatus.ERROR)
    });

    it('should not parse file valid input', async () => {
        const invalidInputs = [
            "invalid/incomplete.shape.missing.please.tdot"
        ];
        for (let input of invalidInputs) {
            let dotProgram = new Program(input);
            let output = dotProgram.parse();
            expect(output.status).to.be.equal(ProgramOutputStatus.ERROR)
        }
    });
});