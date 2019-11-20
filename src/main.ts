import SymbolTable from "./parser/SymbolTable";
import MainNode from "./parser/MainNode";
import {DotProgram} from "./dsl/DotProgram";


let dotProgram = new DotProgram("valid/stats.txt");
dotProgram.compile();