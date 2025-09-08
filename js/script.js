// Mobile menu functionality
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Supabase configuration
const SUPABASE_URL = 'https://yvqinswurpnoasjgmsbt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2cWluc3d1cnBub2Fzamdtc2J0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczMTQ3MTYsImV4cCI6MjA3Mjg5MDcxNn0.UXl4i9Wj5F1v2Gkcx13zrMsTgpJqHtk8DA5juY1vo4U'; 

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Form handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('add-member-form');
    const submitBtn = document.getElementById('submit-btn');
    const loading = document.getElementById('loading');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const memberData = {
            name: formData.get('name'),
            city: formData.get('city'),
            role: formData.get('role')
        };

        // Show loading state
        submitBtn.style.display = 'none';
        loading.style.display = 'block';
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';

        try {
            // Insert data into Supabase
            const { data, error } = await supabase
                .from('members') // Make sure this table exists in your Supabase database
                .insert([memberData]);

            if (error) {
                throw error;
            }

            // Success
            successMessage.style.display = 'block';
            form.reset(); // Clear the form

            // Handle image upload if file was selected
            const imageFile = formData.get('image');
            if (imageFile && imageFile.size > 0) {
                // Note: Image upload would require additional setup with Supabase Storage
                console.log('Image file selected:', imageFile.name);
            }

        } catch (error) {
            // Error handling
            errorMessage.textContent = 'Fel vid sparande: ' + error.message;
            errorMessage.style.display = 'block';
            console.error('Error:', error);
        } finally {
            // Reset button state
            submitBtn.style.display = 'block';
            loading.style.display = 'none';
        }
    });
});