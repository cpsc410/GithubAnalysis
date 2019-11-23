import * as chai from 'chai';
import {Program} from '../../src/program/Program';

import {ProgramOutputStatus} from '../../src/program/ProgramOutput';
import {Flags} from "../../src/program/Flags";
// import {main} from "ts-node/dist/bin";



const expect = chai.expect;

describe('Should be able to parse the GitHub stats', () => {

    before(() => {

    });

    it('should parse file valid input', async () => {
        let flag = new Flags("java", "3", "sum", "3");
        let dotProgram = new Program("valid/statsEverything.txt", flag);
        let output = dotProgram.parse();
        // console.log(output);
        output.symbolTable.table.forEach((value: Map<string, number>, key: string) => {
            console.log(key, value);
        });
        expect(output.status).to.be.equal(ProgramOutputStatus.SUCCESS)
    });

    it('should parse and create json file valid simple input', async () => {
        let flag = new Flags("java", "5", "added", "3");
        let dotProgram = new Program("valid/statsEverything.txt", flag);
        let output = dotProgram.parse();
        dotProgram.compile();
        expect(output.status).to.be.equal(ProgramOutputStatus.SUCCESS)
    });

    it('should parse and create json file valid complicated input', async () => {
        let flag = new Flags("java", "5", "added", "3");
        let dotProgram = new Program("valid/largeRepoAllStats.txt", flag);
        let output = dotProgram.parse();
        dotProgram.compile();
        expect(output.status).to.be.equal(ProgramOutputStatus.SUCCESS)
    });

    it('should not parse file non existing file', async () => {
        let flag = new Flags("java", "5", "added", "3");
        let dotProgram = new Program("sample.tdot", flag);
        let output = dotProgram.parse();
        expect(output.status).to.be.equal(ProgramOutputStatus.ERROR)
    });

    it('should not parse file valid input', async () => {
        let flag = new Flags("java", "5", "added", "3");
        const invalidInputs = [
            "invalid/incomplete.shape.missing.please.tdot"
        ];
        for (let input of invalidInputs) {
            let dotProgram = new Program(input, flag);
            let output = dotProgram.parse();
            expect(output.status).to.be.equal(ProgramOutputStatus.ERROR)
        }
    });
});