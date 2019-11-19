// import {IEventListener} from "../ast/AstVisitor";
import {Node} from "./Node";

export default class SymbolTable {
    table: Map<string, Map<string, number>>;

    constructor() {
        this.table = new Map();
    }

    public size(): number {
        return this.table.size;
    }

    public get(key: string): Map<string, number> {
        return this.table.get(key);
    }

    public has(key: string): boolean {
        return this.table.has(key);
    }

    public update(event: string, currentValue: Map<string, number>, lastValue: Map<string, number>) {
        // if (event === "node" && currentValue instanceof ShapeNode) {
        //     let shapeNode = currentValue;
        //     this.table.set(shapeNode.shape.name, currentValue);
        // }

    }

    public set(key:string, value: Map<string, number>){
        this.table.set(key, value);
    }
}