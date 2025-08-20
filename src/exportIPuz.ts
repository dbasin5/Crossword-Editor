import {makeIPuz} from "./makeIPuz";
import {downloadIPuz} from "./downloadIPuz";
import {GeneratePuzzleArgs} from "./types";

function exportAsIpuzFile(args: GeneratePuzzleArgs): void {
    const ipuz = makeIPuz(args);
    downloadIPuz(ipuz);
}