import SymbolTable from "./parser/SymbolTable";
import MainNode from "./parser/MainNode";
import {Program} from "./program/Program";


let programInstance = new Program("valid/stats.txt");
programInstance.parse();
programInstance.compile();