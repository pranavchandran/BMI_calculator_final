
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
		this.fieldsets = {
			gender:document.getElementById("calculator_fieldset_gender"),
			age:document.getElementById("calculator_fieldset_age"),
			height:document.getElementById("calculator_fieldset_height"),
			weight:document.getElementById("calculator_fieldset_weight"),
			activity:document.getElementById("calculator_fieldset_activity"),
		
		},
		this.fields = {
			activity:this.fieldsets.activity.querySelectorAll("input"),
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
		},
		this.results = {
			tdee: document.getElementById("calculator_tdee").appendChild(document.createTextNode(``)),
			bmi: document.getElementById("calculator_bmi").appendChild(document.createTextNode(``)),
			category: document.getElementById("calculator_category").appendChild(document.createTextNode(``))	
		};

		alert(this.fieldsets, this.fields, this.results)
		
		// document.getElementById('form_calculator').addEventListener('change', event=>this.toggle(event.target),true);
		
		document.getElementById('form_calculator').addEventListener("change", event=>this.toggle(event.target), true);
		document.getElementById('form_calculator').addEventListener("submit", event=>this.calculate(event), false);
		// this.calculate(event);

	// nottaking fieldsets=>fields

	},
	calculate(event){
		event.preventDefault();
		// this.clear();

		let age = this.fields.age.value || 0,
		error = false,
		height = {},
		weight = {},
		activity,bmi,field,gender,tdee;

		for(field in this.fields.gender)
			if(this.fields.gender[field].checked)
				gender = field
				console.log(gender)
		if(!gender){
			error=true;
			this.fieldsets.gender.classList.add('error');
		}
		if(!age){
			error=true;
			this.fieldsets.age.classList.add('error');
		}
		for(field in this.fields.height.units)
			if(this.fields.height.units[field].checked)
				height.units = field
		if(height.units){
			if(height.units==="feet"){
				height.value =+ this.fields.height.values.feet.value||0;
				height.value *= 12;
				height.value +=+ this.fields.height.values.inches.value || 0;
				if(height.value)
					height.value *= 2.54;
				else{
					error=true;
					this.fieldsets.height.classList.add('error');
				}
			}else{
				height.value =+ this.fields.height.values.cms.value||0;
				if(!height.value){
					error = true;
					this.fieldsets.height.classList.add('error');
				}
			}

		}else{
			error=true;
			this.fieldsets.height.classList.add('error');
		}
		for(field in this.fields.weight.units)
			if(this.fields.weight.units[field].checked)
				weight.units = field;
		if(weight.units){
			if(weight.units==='stones'){
				weight.value =+ this.fields.weight.values.stone.value||0;
				weight.value*=14
				weight.value+=+ this.fields.weight.values.pounds.value||0;
				if(weight.value)
					weight.value *= .453592;
				else{
					error=true;
					this.fieldsets.weight.classList.add('error');
				}

			}else{
				weight.value =+ this.fields.weight.values.kgs.value||0;
				if(!weight.value)
					error=true;
					this.fieldsets.weight.classList.add('error');
			}
		}else{
			error=true;
			this.fieldsets.weight.classList.add('error');
		}
		for(field of this.fields.activity)
			if(field.checked)
				activity=+field.value||0;
			if(!activity){
				error=true;
				this.fieldsets.activity.classList.add('error');
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
				// this.results.tdee.nodeValue=Math.round(tdee);
				// this.results.bmi.nodeValue=bmi.toFixed(1);
				// this.results.category.nodeValue=this.categories.find(obj=>bmi<obj.max).name;

				// alert(this.results.tdee.nodeValue, this.results.bmi.nodeValue, this.results.category.nodeValue)
				
			}
		},
	
		clear(){
			alert('clear funciton')
			for(let node in this.results)
				this.results[node].nodeValue=``;
			for(let fieldset in this.fieldsets)
				this.fieldsets[fieldset].classList.remove(`error`);
		},
		toggle(target){
			let div,divs;
			if(target.type===`radio`&&target.dataset.id){
				alert(target.name)
				divs=this.fields[target.name].divs;
				// alert(target.name)
				for(div in divs)
					divs[div].classList.toggle(`hide`,divs[div].id!==target.dataset.id);
			}
		}
}
	
calculator.init();
	
	