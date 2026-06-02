document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const idSuffix = document.getElementById('reg-id').value;
    
    // التحقق من أن الأرقام غير متتالية
    const isSequential = (str) => {
        for (let i = 0; i < str.length - 1; i++) {
            if (Number(str[i]) + 1 === Number(str[i+1])) return true;
        }
        return false;
    };

    if (idSuffix.length !== 5 || isSequential(idSuffix)) {
        alert("رقم الهوية غير صالح! يجب أن يكون 5 أرقام وغير متتالية.");
        return;
    }

    // هنا يتم الانتقال لعملية حفظ البيانات والأنيميشن...
    alert("تم التحقق بنجاح! جاري إصدار هويتك...");
});
