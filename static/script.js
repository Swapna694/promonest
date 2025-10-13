const addBtn = document.getElementById('addBtn');
const campaignForm = document.getElementById('campaignForm');
const saveBtn = document.getElementById('saveBtn');
const campaignList = document.getElementById('campaignList');

let campaigns = [];
let editingIndex = null; // Track index being edited

addBtn.addEventListener('click', () => {
    campaignForm.classList.toggle('hidden');
    editingIndex = null;
    saveBtn.textContent = "Save Campaign";
});

// Fetch campaigns from backend
function fetchCampaigns() {
    fetch('/api/campaigns')
        .then(res => res.json())
        .then(data => {
            campaigns = data;
            renderCampaigns();
        })
        .catch(err => console.error("Failed to load campaigns:", err));
}

// Render campaigns in table
function renderCampaigns() {
    campaignList.innerHTML = '';
    campaigns.forEach((c, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${c.businessName}</td>
            <td>${c.campaignManager}</td>
            <td>${c.startDate}</td>
            <td>${c.description}</td>
            <td>${c.budget}</td>
            <td>${c.status}</td>
            <td>
                <button class="editBtn" data-index="${index}">Edit</button>
                <button class="deleteBtn" data-index="${index}">Delete</button>
            </td>
        `;
        campaignList.appendChild(row);
    });
}

// Save or update campaign
saveBtn.addEventListener('click', () => {
    const campaignData = {
        businessName: document.getElementById('campaign').value,
        campaignManager: document.getElementById('campaignManager').value,
        startDate: document.getElementById('startDate').value,
        description: document.getElementById('description').value,
        budget: document.getElementById('budget').value,
        status: document.getElementById('status').value
    };

    if (!campaignData.businessName || !campaignData.campaignManager || !campaignData.startDate) {
        return alert("Please fill in all required fields!");
    }

    if (editingIndex !== null) {
        // Update campaign
        fetch(`/api/campaigns/${editingIndex}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(campaignData)
        })
        .then(res => {
            if (!res.ok) throw new Error("Update failed");
            campaigns[editingIndex] = campaignData;
            renderCampaigns();
            clearForm();
            campaignForm.classList.add('hidden');
        })
        .catch(err => alert(err.message));
    } else {
        // Add new campaign
        fetch('/api/campaigns', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(campaignData)
        })
        .then(res => {
            if (!res.ok) throw new Error("Failed to add campaign");
            campaigns.push(campaignData);
            renderCampaigns();
            clearForm();
            campaignForm.classList.add('hidden');
        })
        .catch(err => alert(err.message));
    }
});

// Edit/Delete buttons
campaignList.addEventListener('click', (e) => {
    const index = e.target.dataset.index;
    if (e.target.classList.contains('editBtn')) {
        const c = campaigns[index];
        document.getElementById('campaign').value = c.businessName;
        document.getElementById('campaignManager').value = c.campaignManager;
        document.getElementById('startDate').value = c.startDate;
        document.getElementById('description').value = c.description;
        document.getElementById('budget').value = c.budget;
        document.getElementById('status').value = c.status;

        editingIndex = index;
        saveBtn.textContent = "Update Campaign";
        campaignForm.classList.remove('hidden');
    }

    if (e.target.classList.contains('deleteBtn')) {
        if (!confirm("Are you sure you want to delete this campaign?")) return;
        fetch(`/api/campaigns/${index}`, { method: 'DELETE' })
            .then(res => {
                if (!res.ok) throw new Error("Failed to delete campaign");
                campaigns.splice(index, 1);
                renderCampaigns();
            })
            .catch(err => alert(err.message));
    }
});

// Clear form after saving
function clearForm() {
    document.getElementById('campaign').value = '';
    document.getElementById('campaignManager').value = '';
    document.getElementById('startDate').value = '';
    document.getElementById('description').value = '';
    document.getElementById('budget').value = '';
    document.getElementById('status').value = 'Active';
    editingIndex = null;
    saveBtn.textContent = "Save Campaign";
}

// Initialize
fetchCampaigns();
