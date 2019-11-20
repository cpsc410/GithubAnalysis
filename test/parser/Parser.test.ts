import * as chai from 'chai';
import {DotProgram} from '../../src/dsl/DotProgram';

import {ProgramOutputStatus} from '../../src/dsl/ProgramOutput';
import forEach = require("core-js/fn/array/for-each");


const expect = chai.expect;

describe('Should be able to parse the GitHub stats', () => {

    before(() => {

    });

    it('should parse file valid input', async () => {
        let dotProgram = new DotProgram("valid/stats.txt");
        let output = dotProgram.parse();
        // console.log(output);
        output.symbolTable.table.forEach((value: Map<string, number>, key: string) => {
            console.log(key, value);
        });

        expect(output.status).to.be.equal(ProgramOutputStatus.SUCCESS)
    });

    it('should parse file valid simple input', async () => {
        let dotProgram = new DotProgram("valid/stats.txt");
        let output = dotProgram.parse();
        let consoleout = dotProgram.compile();
        expect(output.status).to.be.equal(ProgramOutputStatus.SUCCESS)
    });

    it('should not parse file non existing file', async () => {
        let dotProgram = new DotProgram("sample.tdot");
        let output = dotProgram.parse();
        expect(output.status).to.be.equal(ProgramOutputStatus.ERROR)
    });

    it('should not parse file valid input', async () => {
        const invalidInputs = [
            "invalid/non.valid.shape.tdot",
            "invalid/incomplete.shape.missing.shape.tdot",
            "invalid/incomplete.shape.missing.identifier.tdot",
            "invalid/incomplete.shape.missing.please.tdot"
        ];
        for (let input of invalidInputs) {
            let dotProgram = new DotProgram(input);
            let output = dotProgram.parse();
            expect(output.status).to.be.equal(ProgramOutputStatus.ERROR)
        }
    });
});