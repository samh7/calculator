import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// var Parser = require('expr-eval').Parser;
// import { Parser } from "expr-eval"
import { compile } from "angular-expressions"
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

    history: string[] = [];
    equalsButtonClick() {
        const outputText = document.getElementById("output-line-main")
        let content: string = outputText!.textContent!
        if (outputText!.textContent!.length > 1) {

            try {
                let expr = compile(outputText!.textContent!)
                const result = expr();
                content += " = " + result
                this.history = this.history.reverse()
                this.history.push(content)
                this.history.reverse()
                outputText!.textContent = result


            }

            catch {
                content += " = "
                this.history.push(content)
                outputText!.textContent = "Error"
                this.history.reverse()

            }
        }

    }
    ngOnInit(): void {

        const keyButtons = document.querySelectorAll(".key")
        const outputText = document.getElementById("output-line-main")
        const outputContainer = document.getElementById("output")
        const operators = ["%", "/", "*", "-", "+", "=", ".", "C", "X", "!"]

        keyButtons.forEach(element => {

            element.addEventListener("click", function (e) {
                if (outputText!.textContent === "Error" && element.id !== "=") {
                    outputText!.textContent = "";
                }
                if (element.id === "=") {

                }

                else if (element.id === "C") {
                    outputText!.textContent = ""
                }
                else if (element.id === "X") {
                    outputText!.textContent = outputText!.textContent!.slice(0, outputText!.textContent!.length - 1)
                }
                else {
                    console.log(operators.includes(element.id, 0))
                    if (outputText!.textContent === "0") {
                        outputText!.textContent = "";
                    } if (outputText!.textContent!.length < 20) {
                        if (!operators.includes(outputText!.textContent![outputText!.textContent!.length - 1], 0)
                            || !(operators.includes(element.id))
                        ) {
                            if (operators.includes(element.id, 0) && outputText!.textContent!.length > 0) {
                                // if(!(outputText!.textContent!.includes("%",0) || outputText!.textContent!.includes(".",0))){}
                                outputText!.textContent += element.id
                            }
                            else if (!operators.includes(element.id, 0)) {

                                outputText!.textContent += element.id

                            }
                        }
                    }
                }
            })

        });
    }
}
