import SymbolTable from "./parser/SymbolTable";
import MainNode from "./parser/MainNode";
import {DotProgram} from "./dsl/DotProgram";


let dotProgram = new DotProgram("sample.tdot");
dotProgram.compile();