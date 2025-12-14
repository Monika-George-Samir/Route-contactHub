var contactFullNameInput = document.getElementById("contactFullName");
var contactFirstLetter = "";
var contactPhoneNumberInput = document.getElementById("contactPhoneNumber");
var contactEmailInput = document.getElementById("contactEmail");
var contactAddressInput = document.getElementById("contactAddress");
var contactGroupInput = document.getElementById("contactGroup");
var contactNotesInput = document.getElementById("contactNotes")
var checkFavoriteInput = document.getElementById("checkFavorite");
var checkEmergencyInput = document.getElementById("checkEmergency");
var contactList = [];
var groupStyles = {
    family: "group-family",
    friends: "group-friends",
    work: "group-work",
    school: "group-school",
    other: "group-other"
};

var saveBtn = document.getElementById("saveBtn");
var noContact = document.getElementById("noContact");

// var noFav = document.getElementById("noFav");
// var noEmer = document.getElementById("noEmer");

if (JSON.parse(localStorage.getItem("allContacts"))) {
    contactList = JSON.parse(localStorage.getItem("allContacts"));
    displayContact(contactList);
    countContacts();
}







// contactEmailInput.style.background = 'linea'


function addContact() {

    if (!validateFormInputs(contactFullNameInput)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Name",
            text: "Name should contain only letters and spaces (2-50 characters)",

        });
    } else if (!validateFormInputs(contactPhoneNumberInput)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Phone",
            text: "Please enter a valid Egyptian phone number (e.g., 01012345678 or +201012345678)",
        });
    } else if (!validateFormInputs(contactEmailInput)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Email",
            text: "Please enter a valid email address",
        });
    } else if (!validateFormInputs(contactPhoneNumberInput)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Phone",
            text: "Please enter a valid Egyptian phone number (e.g., 01012345678 or +201012345678)",
        });
    } else {


        var contact = {
            fullName: contactFullNameInput.value,
            firstLetter: contactFullNameInput.value.charAt(0).toUpperCase(),
            phoneNumber: contactPhoneNumberInput.value,
            email: contactEmailInput.value,
            address: contactAddressInput.value,
            group: contactGroupInput.value,
            notes : contactNotesInput.value,
            checkFavorite: checkFavoriteInput.checked,
            checkEmergency: checkEmergencyInput.checked

        }

        var editedIdx = saveBtn.getAttribute("updatedIdx");
        for (var i = 0; i < contactList.length; i++) {
            if (editedIdx !=i && contactList[i].phoneNumber === contactPhoneNumberInput.value) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Duplicate Phone Number',
                    text: `A contact with this phone number already exists: ${contactList[i].fullName}`,
                    timer: 2000,
                    showConfirmButton: false
                });
                
            }
            
        }
        

        if (editedIdx) {
            // contactList[editedIdx] = contact;
            contactList[editedIdx].fullName = contactFullNameInput.value;
            contactList[editedIdx].firstLetter = contactFullNameInput.value.charAt(0).toUpperCase();
            contactList[editedIdx].phoneNumber = contactPhoneNumberInput.value;
            contactList[editedIdx].email = contactEmailInput.value;
            contactList[editedIdx].address = contactAddressInput.value;
            contactList[editedIdx].group = contactGroupInput.value;
            contactList[editedIdx].notes = contactNotesInput.value;
            contactList[editedIdx].checkFavorite = checkFavoriteInput.checked;
            contactList[editedIdx].checkEmergency = checkEmergencyInput.checked;

            saveBtn.removeAttribute("updatedIdx");

            Swal.fire({
                title: "Updated!",
                icon: "success",
                text: 'Contact is updated successfully.',
                draggable: true,
                timer: 1500,
                showConfirmButton: false
            });
            countContacts();
            hideModal();
        } else {
            contactList.push(contact);
            countContacts();

            Swal.fire({
                title: "Added!",
                icon: "success",
                text: 'Contact is added successfully.',
                draggable: true,
                timer: 1500,
                showConfirmButton: false
            });
            hideModal();
        }


        localStorage.setItem("allContacts", JSON.stringify(contactList));
        displayContact(contactList);
        clearForm();
    }

}





function clearForm() {
    contactFullNameInput.value = "";
    contactPhoneNumberInput.value = "";
    contactEmailInput.value = "";
    contactAddressInput.value = "";
    contactGroupInput.selectedIndex = 0;
    contactNotesInput.value = "";
    checkFavoriteInput.checked = false;
    checkEmergencyInput.checked = false;
}




function editContact(editedIdx) {
    saveBtn.setAttribute("updatedIdx", editedIdx)

    contactFullNameInput.value = contactList[editedIdx].fullName;
    contactPhoneNumberInput.value = contactList[editedIdx].phoneNumber;
    contactEmailInput.value = contactList[editedIdx].email;
    contactAddressInput.value = contactList[editedIdx].address;
    contactGroupInput.value = contactList[editedIdx].group;
    contactNotesInput.value = contactList[editedIdx].notes;
    checkFavoriteInput.checked = contactList[editedIdx].checkFavorite;
    checkEmergencyInput.checked = contactList[editedIdx].checkEmergency;

    document.getElementById("addBtn");
     
}




// function updateContact() {
//     var editedIdx = saveBtn.getAttribute("updatedIdx");

//     contactList[editedIdx].fullName = contactFullNameInput.value;
//     contactList[editedIdx].phoneNumber = contactPhoneNumberInput.value;
//     contactList[editedIdx].email = contactEmailInput.value;
//     contactList[editedIdx].address = contactAddressInput.value;
//     contactList[editedIdx].group = contactGroupInput.vlue;
//     contactList[editedIdx].checkFavorite = checkFavoriteInput.checked;
//     contactList[editedIdx].checkEmergency = checkEmergencyInput.checked;

//     localStorage.setItem("allContacts", JSON.stringify(contactList));
//     displayContact(contactList);
//     clearForm();

// }


function displayContact(list) {
    var blackBox = "";
    var favBlackBox = "";
    var emerBlackBox = "";
    var groupCheck = "";
    var envelopeMain = "";
    var envelope = "";
    var hasFav = false;
    var hasEmer = false;

    if (list.length === 0) {
        noContact.classList.add("d-block");
        noContact.classList.remove("d-none");
    } else {
        noContact.classList.add("d-none");
        noContact.classList.remove("d-block");
    }

    for (var i = 0; i < list.length; i++) {


        if (list[i].group) {
            var className = groupStyles[list[i].group];
            groupCheck = `<span class="contact-group ${className} text-capitalize py-1 px-2 fw-medium">${list[i].group}</span>`
        } else {
            className = "";
        }


        if (list[i].email) {
            envelope = `<a href="mailto:${list[i].email}" class="btn contact-mail d-flex justify-content-center align-items-center"><i class="fa-solid fa-envelope"></i></a>`;
            envelopeMain = `<div class="contact-email d-flex column-gap-2 mb-2">
                                            <div
                                                class="contact-span envelope-span d-flex justify-content-center align-items-center">
                                                <i class="fa-solid fa-envelope"></i>
                                            </div>
                                            <span>${list[i].email}</span>
                                        </div>`
        }


        blackBox += ` <div class="col-sm-6">
                                    <div class="contact-card bg-white rounded-4">
                                        <div class="contact-details px-3 pt-3">
                                            <div class="contact-name d-flex gap-3">
                                                <div class="letter position-relative">
                                                    <div
                                                        class="name-1letter text-capitalize d-flex justify-content-center align-items-center text-white fw-semibold">
                                                        ${list[i].firstLetter}
                                                    </div>
                                                    <div
                                                        class="letter-span letter-star rounded-circle d-flex justify-content-center align-items-center position-absolute ${list[i].checkFavorite ? '' : "d-none"}">
                                                        <i class="fa-solid fa-star text-white"></i>
                                                    </div>
                                                    <div
                                                        class="letter-span letter-heart rounded-circle d-flex justify-content-center align-items-center position-absolute ${list[i].checkEmergency ? '' : "d-none"}">
                                                        <i class="fa-solid fa-heart-pulse text-white"></i>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 class="h6 fw-semibold mb-0">${list[i].fullName}</h3>
                                                    <div class="contact-number d-flex mt-1">
                                                        <div
                                                            class="phone-span d-flex justify-content-center align-items-center me-2">
                                                            <i class="fa-solid fa-phone"></i>
                                                        </div>
                                                        <span>${list[i].phoneNumber}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            ${envelopeMain}
                                            ${list[i].address ? `<div class="contact-address d-flex column-gap-2 mt-2">
                                                <div
                                                    class="contact-span address-span d-flex justify-content-center align-items-center">
                                                    <i class="fa-solid fa-location-dot"></i>
                                                </div>
                                                <span>${list[i].address}</span>
                                            </div>` : ""}
                                            <div class="my-2 h-100">
                                                ${groupCheck}
                                               ${list[i].checkEmergency ? `<span class="contact-emergency py-1 px-2 fw-medium">
                                                    <i class="fa-solid fa-heart-pulse"></i>
                                                    <span>Emergency</span> 
                                                </span>` : ""}
                                            </div>
                                        </div>
                                        <div class="contact-card-footer d-flex justify-content-between px-3">
                                            <div class="reach-direct d-flex column-gap-2">
                                                <a href="tel:${list[i].phoneNumber}" class="btn contact-call d-flex justify-content-center align-items-center"><i class="fa-solid fa-phone"></i></a>
                                                ${envelope}
                                            </div>
                                            <div class="card-btns d-flex column-gap-2">
                                                <button onclick="toggleFavorite(${i})" class="btn contact-favorite-add d-flex justify-content-center align-items-center"><i class="${list[i].checkFavorite ? `fa-solid fa-star main-orange-color` : `fa-regular fa-star`}"></i></button>
                                                <button onclick="toggleEmergency(${i})" class="btn contact-emergency-add d-flex justify-content-center align-items-center"><i class="${list[i].checkEmergency ? `fa-solid fa-heart-pulse main-red-color` : `fa-regular fa-heart`}"></i></button>
                                                <button data-bs-toggle="modal"
                            data-bs-target="#formInputs" onclick="editContact(${i})" class="btn contact-edit d-flex justify-content-center align-items-center"><i class="fa-solid fa-pen"></i></button>
                                                <button onclick="deleteContact(${i})" class="btn contact-delete d-flex justify-content-center align-items-center"><i class="fa-solid fa-trash"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div> `



        if (list[i].checkFavorite) {
            favBlackBox += ` <div class="col-md-6">
                                    <a href="tel:${list[i].phoneNumber}"
                                        class="d-flex justify-content-between align-items-center text-decoration-none p-2">
                                        <div class="d-flex column-gap-2">
                                            <div
                                                class="fav-1letter text-capitalize d-flex justify-content-center align-items-center text-white fw-semibold rounded-2">
                                                ${list[i].firstLetter}</div>
                                            <div class="fav-name">
                                                <span class="fw-medium">${list[i].fullName}</span>
                                                <p class="m-0">${list[i].phoneNumber}</p>
                                            </div>
                                        </div>
                                        <div><i class="fa-solid fa-phone"></i></div>
                                    </a>
                                    
                                </div>`
            hasFav = true;

        }


        if (list[i].checkEmergency) {
            emerBlackBox += `<div class="col-md-6">
                                 <a href="tel:${list[i].phoneNumber}"
                                    class="d-flex justify-content-between align-items-center text-decoration-none p-2">
                                    <div class="d-flex column-gap-2">
                                        <div
                                            class="emer-1letter text-capitalize d-flex justify-content-center align-items-center text-white fw-semibold rounded-2">
                                            ${list[i].firstLetter}</div>
                                        <div class="emer-name">
                                            <span class="fw-medium">${list[i].fullName}</span>
                                            <p class="m-0">${list[i].phoneNumber}</p>
                                        </div>
                                    </div>
                                    <div><i class="fa-solid fa-phone"></i></div>
                                </a>
                                </div>`
            hasEmer = true;

        }
    }
    document.getElementById("contactList").innerHTML = blackBox;
    document.getElementById("favoriteCard").innerHTML = favBlackBox;
    document.getElementById("emergencyCard").innerHTML = emerBlackBox;


    if (hasFav) {
        noFav.classList.remove("d-block");
        noFav.classList.add("d-none");
    } else {
        noFav.classList.add("d-block");
        noFav.classList.remove("d-none");
    }

    if (hasEmer) {
        noEmer.classList.remove("d-block");
        noEmer.classList.add("d-none");
    } else {
        noEmer.classList.add("d-block");
        noEmer.classList.remove("d-none");
    }



}


function toggleFavorite(index) {
    contactList[index].checkFavorite = !contactList[index].checkFavorite;
    localStorage.setItem("allContacts", JSON.stringify(contactList))
    countContacts();
    displayContact(contactList)
}

function toggleEmergency(index) {
    contactList[index].checkEmergency = !contactList[index].checkEmergency;
    countContacts();
    localStorage.setItem("allContacts", JSON.stringify(contactList))
    displayContact(contactList)
}



function searchContact(element) {
    var matchedList = [];
    for (var i = 0; i < contactList.length; i++) {
        if (contactList[i].fullName.toLowerCase().includes(element.value.toLowerCase()) || contactList[i].email.toLowerCase().includes(element.value.toLowerCase()) || contactList[i].phoneNumber.includes(element.value)) {
            matchedList.push(contactList[i])
            displayContact(matchedList);
        } else {
            displayContact(matchedList);
            noContact.classList.add("d-block");
        }


    }
}




function validateFormInputs(element) {
    var regex = {
        contactFullName: /^[a-zA-Z ]{2,50}$/,
        contactPhoneNumber: /^01[0125][0-9]{8}$/,
        contactEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        contactAddress: /^[a-zA-Z0-9\s,.\-#]{5,100}$/,
        contactGroup: /^(family|friends|work|school|other)$/,
        contactNotes: /^\w{4,255}$/
    }


    var isValid = regex[element.id].test(element.value);

    if (isValid) {
        element.classList.remove("is-invalid");
        element.nextElementSibling.classList.replace("d-block", "d-none")
    } else {
        element.classList.add("is-invalid");
        element.nextElementSibling.classList.replace("d-none", "d-block")
    }

    return isValid;
}




function countContacts() {
    var total = contactList.length;
    var favoriteCount = 0;
    var emergencyCount = 0;
    for (var i = 0; i < contactList.length; i++) {
        if (contactList[i].checkFavorite) {
            favoriteCount++;
        }
        if (contactList[i].checkEmergency) {
            emergencyCount++;
        }
    }
    document.getElementById('totalContacts').textContent = total;
    document.getElementById('totalContactsSerch').textContent = total;
    document.getElementById('favoriteContacts').textContent = favoriteCount;
    document.getElementById('emergencyContacts').textContent = emergencyCount;
}


function deleteContact(deletedIdx) {
    Swal.fire({
        title: "Delete Contact?",
        text: "Are you sure you want to delete monika george? This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            contactList.splice(deletedIdx, 1);
            countContacts();
            localStorage.setItem("allContacts", JSON.stringify(contactList));
            displayContact(contactList);
            Swal.fire({
                title: "Deleted!",
                text: "Contact has been deleted.",
                icon: "success"
            });
        }
    });

}


function hideModal() {
    var myModal = document.getElementById('formInputs');
    var modal = bootstrap.Modal.getInstance(myModal);
    modal.hide();
}