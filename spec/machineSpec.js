require('../src/machine.js')

describe('Error Handlers in machine.js',function(){
	it("addIntruction",function(){
		expect(function(){ (new turingMachine).addInstruction({}); }).toThrow(new Error("Instruction not structured properly."));	
	});

});

describe('Actual work',function(){
	
	it("addInstruction",function(){
		expect(function(){
			var mac = new turingMachine();
			var set = {
				currentState : "0",
				valueOnStack : "1",
				replacementValue : "A",
				headMovement : "L"		
			};
			return mac.addInstruction(set);
		}())
		.toEqual(jasmine.any(Number));
	});	
});
