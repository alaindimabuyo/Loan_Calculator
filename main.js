document.getElementById('loan-form').addEventListener('submit', function(e){
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    setTimeout(calculate, 2000);
    e.preventDefault();
});

// calculate function

function calculate(e){
    console.log('alain')
    
    //UI variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment')
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute monthly payment
    const a = Math.pow(1+ calculatedInterest, calculatedPayments);
    const monthly = (principal * a * calculatedInterest)/(a-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        document.getElementById('results').style.display = 'block';
        document.getElementById('loading').style.display = 'none';
    }else{
        showError('Please check your numbers')
        document.getElementById('loading').style.display = 'none';
    }
}
function showError(err){
    const errorDiv = document.createElement('div')
    //add class
    errorDiv.className = 'alert alert-danger'
    // add text
    errorDiv.appendChild(document.createTextNode(err))
    
    //get the element
    const card = document.querySelector('.card')
    const heading = document.querySelector('.heading')

    card.insertBefore(errorDiv , heading)

    setTimeout(clearError, 3000);


}

function clearError(){
    document.querySelector('.alert').remove();
}
