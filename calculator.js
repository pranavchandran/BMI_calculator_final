const calculator={
	init(){
		calculator.form=document.getElementById(`form_calculator`);
		calculator.categories=[{
			name:`Underweight`,
			max:20
		},{
			name:`Healthy`,
			max:25
		},{
			name:`Overweight`,
			max:30
		},{
			name:`Obese`,
			max:35
		},{
			name:`Super Obese`,
			max:40
		},{
			name:`Morbid Obese`,
			max:500
		}];
	console.log(calculator.categories)

		}
		}

function myFunction(event) {
	calculator.fieldsets = {
		gender:document.getElementById("calculator_fieldset_gender"),
		age:document.getElementById("calculator_fieldset_age"),
		height:document.getElementById("calculator_fieldset_height"),
		weight:document.getElementById("calculator_fieldset_weight"),
		activity:document.getElementById("calculator_fieldset_activity"),
	
	}
	console.log(calculator.fieldsets.activity)
	calculator.fields = {
		activity:calculator.fieldsets.activity.querySelectorAll("input"),
		age:document.getElementById("calculator_age"),
		gender:{
			female: document.getElementById("calculator_female"),
			male: document.getElementById("calculator_male")
		},
		height:{
			units:{
				feet: document.getElementById("calculator_units_feet"),
				cms: document.getElementById("calculator_units_cms")
			},
			divs:{
				feet: document.getElementById("calculator_div_feet"),
				cms: document.getElementById("calculator_div_cms")
			},
			values:{
				feet: document.getElementById("calculator_feet"),
				inches: document.getElementById("calculator_inches"),
				cms: document.getElementById("calculator_cms")
			}
		},
		weight:{
			units:{
				stones: document.getElementById("calculator_units_stones"),
				kgs: document.getElementById("calculator_units_kgs")
			},
			divs:{
				stones: document.getElementById("calculator_div_stones"),
				kgs: document.getElementById("calculator_div_kgs")
			},
			values:{
				stones: document.getElementById("calculator_stones"),
				pounds: document.getElementById("calculator_pounds"),
				kgs: document.getElementById("calculator_kgs")
			}
		}
	};
	console.log(calculator.fields)
	calculator.results = {
		tdee: document.getElementById("calculator_tdee").appendChild(document.createTextNode(``)),
		bmi: document.getElementById("calculator_bmi").appendChild(document.createTextNode(``)),
		category: document.getElementById("calculator_category").appendChild(document.createTextNode(``))	
	};
	console.log('calculator_results :',calculator.results)
	document.getElementById('form_calculator').addEventListener("change", event=>calculator.toggle(event.target), true);
	document.getElementById('form_calculator').addEventListener("submit", event=>calculator.calculate(event), false);
	this.calculate(event);

	};

calculator.init();
	
	function calculate(event){
		event.preventDefault();
		this.clear();

		let age = calculator.fields.age.value || 0,
		error = false,
		height = {},
		weight = {},
		activity,bmi,field,gender,tdee;

		for(field in calculator.fields.gender)
			if(calculator.fields.gender[field].checked)
				gender = field
				console.log(gender)
		if(!gender){
			error=true;
			calculator.fieldsets.gender.classList.add('error');
		}
		if(!age){
			error=true;
			calculator.fieldsets.age.classList.add('error');
		}
		for(field in calculator.fields.height.units)
			if(calculator.fields.height.units[field].checked)
				height.units = field
		if(height.units){
			if(height.units==="feet"){
				height.value =+ calculator.fields.height.values.feet.value||0;
				height.value *= 12;
				height.value +=+ calculator.fields.height.values.inches.value || 0;
				if(height.value)
					height.value *= 2.54;
				else{
					error=true;
					calculator.fieldsets.height.classList.add('error');
				}
			}else{
				height.value =+ calculator.fields.height.values.cms.value||0;
				if(!height.value){
					error = true;
					calculator.fieldsets.height.classList.add('error');
				}
			}

		}else{
			error=true;
			calculator.fieldsets.height.classList.add('error');
		}
		for(field in calculator.fields.weight.units)
			if(calculator.fields.weight.units[field].checked)
				weight.units = field;
		if(weight.units){
			if(weight.units==='stones'){
				weight.value =+ calculator.fields.weight.values.stone.value||0;
				weight.value*=14
				weight.value+=+ calculator.fields.weight.values.pounds.value||0;
				if(weight.value)
					weight.value *= .453592;
				else{
					error=true;
					calculator.fieldsets.weight.classList.add('error');
				}

			}else{
				weight.value =+ calculator.fields.weight.values.kgs.value||0;
				if(!weight.value)
					error=true;
					calculator.fieldsets.weight.classList.add('error');
			}
		}else{
			error=true;
			calculator.fieldsets.weight.classList.add('error');
		}
		for(field of calculator.fields.activity)
			if(field.checked)
				activity=+field.value||0;
			if(!activity){
				error=true;
				calculator.fieldsets.activity.classList.add('error');
			}
			if(!error){
				console.log(activity);
				bmi = weight.value/(height.value/100)**2;
				console.log(bmi)
				tdee = gender === 'male' ?5:-161;

				tdee+=10*weight.value+6.25*height.value-5*age;
				tdee*=activity;

				// new code
				document.getElementById("calculator_tdee_span").textContent=Math.round(tdee);
				document.getElementById("calculator_bmi_span").textContent=bmi.toFixed(1);
				document.getElementById("calculator_category_span").textContent=calculator.categories.find(obj=>bmi<obj.max).name;

				// old code
				// calculator.results.tdee.nodeValue=Math.round(tdee);
				// calculator.results.bmi.nodeValue=bmi.toFixed(1);
				// calculator.results.category.nodeValue=calculator.categories.find(obj=>bmi<obj.max).name;

				// calculator_tdee_span_1 = document.getElementById("#calculator_tdee_span");
				// calculator_tdee_span_1.textContent = calculator.results.tdee.nodeValue

				
				
				// console.log(calculator.results.tdee.nodeValue, calculator.results.bmi.nodeValue, calculator.results.category.nodeValue)
			}
		}
		function clear(){
			for(let node in calculator.results)
				calculator.results[node].nodeValue = '';
			// for(let fieldset in calculator.fieldsets)
				// calculator.fieldsets[fieldset].classList.remove('error');
			
		}
		function toggle(target){
			let div,divs;
			if(target.type==='radio'&&target.dataset.id){
				divs = calculator.fields[target.name].divs;
				for(div in divs)
					divs[div].classList.toggle('hide',divs[div].id!==target.dataset.id);

			}

		}
