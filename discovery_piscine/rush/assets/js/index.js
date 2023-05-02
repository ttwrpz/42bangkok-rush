document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    const dots = document.querySelectorAll(".dot");

    function updateNavigation() {
        const scrollPosition = window.scrollY;
        const currentSectionIndex = Array.from(sections).findIndex(section => {
            const sectionTop = section.offsetTop - 70;
            const sectionHeight = section.clientHeight;
            return scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight;
        });

        if (currentSectionIndex !== -1) {
            dots.forEach(dot => dot.classList.remove("active"));
            dots[currentSectionIndex].classList.add("active");
        }
    }

    window.addEventListener("scroll", updateNavigation);

    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const submitBtn = document.getElementById('submit');
        const toInput = document.getElementById('to');
        const senderInput = document.getElementById('sender');
        const telInput = document.getElementById('tel');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');

        submitBtn.addEventListener('click', () => {
            const to = encodeURIComponent(toInput.value);
            const subject = encodeURIComponent(`${subjectInput.value} (${senderInput.value} - ${telInput.value})`);
            const message = encodeURIComponent(messageInput.value);
            window.location.href = `mailto:${to}?subject=${subject}&body=${message}`;
        });
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!entry.target.classList.contains('animate__animated')) {
                    entry.target.classList.add('animate__animated');
                    entry.target.classList.remove('animate__animated--paused');
                }
            } else {
                if (!entry.target.classList.contains('animate__animated--paused')) {
                    entry.target.classList.add('animate__animated--paused');
                    entry.target.classList.remove('animate__animated');
                }
            }
        });
    }, {
        threshold: [0, 1]
    });

    document.querySelectorAll(".animate__animated:not(.animate__animated--ignore)").forEach(element => {
        observer.observe(element);
    });
});