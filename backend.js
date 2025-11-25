function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getName() {
  const names = [
    "Sophia", "Jocelyn", "Oliver", "Emery", "Vivian",
    "Mason", "Eden", "Caleb", "Sawyer", "Adrian",
    "Liam", "Brian", "George", "Luis", "Kimberly",
    "Wyatt", "Aidan", "Eliza", "Christopher", "Andrea"
  ];
  
  
  return names[Math.floor(Math.random() * names.length)];
}


function getNoteName() {
  const names = [
  "ভাসা অক্ষর",
  "নতুন পাতা",
  "ভাবনাটুকু",
  "চুপচাপ লেখা",
  "অনুচিন্তার খাতা",
  "ফেলে রাখা কথা",
  "অনুরাগের কথা",
  "শব্দের খোঁজে",
  "আলগোছে লেখা",
  "অনলিখিত বাক্য",
  "অজানা অধ্যায়",
  "ফাঁকা লাইনগুলো",
  "মনের টুকরো",
  "পৃষ্ঠার শুরু",
  "হাওয়ায় লেখা নোট",
  "অক্ষরের খেলা",
  "অনুপূর্ণ লাইন",
  "এক ঝলক লেখা",
  "অল্পকথা",
  "মুগ্ধ কথা",
  "মনোজগতের পৃষ্ঠা",
  "নিজের জন্য লেখা",
  "অদেখা নোট",
  "রঙহীন খাতা",
  "ভাবনার খাতায়",
  "শব্দের টুকরো",
  "সূচনাহীন শেষ",
  "অপেক্ষায় থাকা কবিতা",
  "পাতার আড়ালে",
  "একলা লেখা",
  "শব্দহীন ভাবনা",
  "অস্থায়ী পৃষ্ঠা",
  "আলোকহীন খসড়া",
  "রুক্ষ কথা",
  "অনায়াসে লেখা",
  "মনের রেখা",
  "সাদামাটা খাতা",
  "স্মৃতির আড়ালে",
  "অজানা ভাবনার খসড়া"
];
  
  
  return names[Math.floor(Math.random() * names.length)];
}







window.sb = supabase.createClient('https://tjmhvfecspwakhsmwjxo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqbWh2ZmVjc3B3YWtoc213anhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1ODY1MDYsImV4cCI6MjA3NzE2MjUwNn0.QHr3rGqI4MzS8NENbqhiiunXwZHmtdH1hplgX7Jbio8');

window.data = null;
window.error = null;
let user = null;
window.id = null;
let email = null;








({ data, error } = await sb.auth.getSession());


if (document.body.dataset.page === "signinup") {
  
  if (!(data.session == null)) {
    
    window.location.href = "index.html";
    
    
    
  }
  
  
  
  
} else {
  
  if (data.session == null) {
    
    window.location.href = "signinup.html";
    
  }
  
  
}






({ data: { user } } = await sb.auth.getUser());

if (user) {
  id = user.id;
  email = user.email;
}










let signout = document.getElementById('signout');
if (signout) {
  
  signout.addEventListener('click', async function() {
    
    ({ error } = await sb.auth.signOut());
    window.location.href = "signinup.html";
    
    
    
    
    
    
  });
  
  
  
}



let sign = document.getElementById('sign');
if (sign) {
  sign.addEventListener('click', async function() {
    
    let email = document.getElementById('email').value.trim();
    let pass = document.getElementById('pass').value.trim();
    
    ({ data, error } = await sb.auth.signInWithPassword({
      email: email,
      password: pass,
    }));
    
    if (error) {
      
      ({ data, error } = await sb.auth.signUp({
        email: email,
        password: pass,
      }));
      
      ({ data, error } = await sb.auth.signInWithPassword({
        email: email,
        password: pass,
      }));
      
      
      let name = getName();
      
      ({ error } = await sb
        .from('userInfo')
        .insert({
          
          name: 'Homo sapiens',
          profile: 'https://api.dicebear.com/9.x/notionists-neutral/svg?seed=${name}&backgroundColor=transparent',
          
          
          
          
        }));
      
      
      
      
      ({ error } = await sb
        .from('socialInfo')
        .insert({
          
          
          frnds: [],
          frndReqsSent: [],
          frndReqsReceived: [],
          
          
          
        }));
      
      
      window.location.href = "index.html";
      
      
    } else {
      
      
      
      window.location.href = "index.html";
    }
    
    
    
    
    
    
    
    
    
    
  });
}









if (document.body.dataset.page === "profile") {}


({ data, error } = await sb
  .from('userInfo')
  .select('profile')
  .eq('user_id', id));

let profile = data[0].profile;



const profilePic = document.querySelectorAll('.profilePic');


profilePic.forEach(picc => {
  
  
  
  
  picc.src = profile;
  
  
  
});














/* Gallery */

const uploadBtn = document.getElementById("uploadBtn");
const fileInput = document.getElementById("fileInput");
const gallery = document.getElementById("gallery");

if (uploadBtn) {
  uploadBtn.onclick = () => fileInput.click();
}

if (fileInput) {
  fileInput.onchange = async (e) => {
    let file = e.target.files[0];
    if (!file) return;
    
    let fileName = id + "/" + Date.now() + "_" + file.name;
    let { error } = await sb.storage.from("imgGallery").upload(fileName, file);
    
    if (error) {
      alert("Upload failed");
      return;
    }
    
    loadGallery();
  };
}

async function loadGallery() {
  if (!gallery) { return; }
  let { data: files, error } = await sb.storage.from("imgGallery").list(id, {
    limit: 1000,
    offset: 0,
  });
  
  if (error) return;
  
  // sort so newest (largest created_at timestamp) comes first
  files.sort((a, b) => b.created_at.localeCompare(a.created_at));
  
  gallery.innerHTML = "";
  
  for (let file of files) {
    let { data } = sb.storage.from("imgGallery").getPublicUrl(id + "/" + file.name);
    let img = document.createElement("img");
    img.src = data.publicUrl;
    img.addEventListener("click", () => {
      navigator.clipboard.writeText(data.publicUrl);
    });
    gallery.appendChild(img);
  }
}

loadGallery();














// add notes


const addNotes = document.getElementById("addNotes");

if (addNotes) {
  
  
  
  
  addNotes.addEventListener("click", async function() {
    
    
    
    ({ error } = await sb
      .from('notes')
      .insert({
        
        note_title: getNoteName(),
        note_json: { blocks: [] },
        
      }));
    
    
    
    
    loadNotes(0);
    
    
  });
  
  
  
  
  
  
}


async function loadNotes(stateNum) {
  const notes = document.getElementById("notes");
  const loaderImg = document.getElementById("loaderImg");
  
  let paragraphs = notes.querySelectorAll('p');
  let tutorial = document.getElementById("tutorial");
  
  ({ data, error } = await sb
    .from('notes')
    .select('note_title ,created_at')
    .eq('user_id', id)
    .order('created_at', { ascending: false }));
  
  
  if (data) {
    
    if (stateNum) {
      
      await wait(500);
      loaderImg.style.opacity = "0";
      tutorial.style.opacity = "0";
      await wait(500);
      notes.innerHTML = "";
      
      
      data.forEach(note => {
        
        
        const noteItem = document.createElement("p");
        
        noteItem.textContent = note.note_title;
        
        
        
        noteItem.addEventListener('click', () => {
          
          
          
          const url = `noteEdit.html?note_title=${encodeURIComponent(note.note_title)}&created_at=${encodeURIComponent(note.created_at)}`;
          window.location.href = url;
        });
        
        
        notes.appendChild(noteItem);
        
        
        
        
        
        
        
      });
      
      
      paragraphs = notes.querySelectorAll('p');
      
      
      
      paragraphs.forEach(async (p, i) => {
        
        setTimeout(() => {
          
          
          
          p.classList.add('show');
          p.style.marginBottom="10px";
          
          
        }, (i + 1) * 150);
        
      });
      
      
      
      
      
    }
    
    else {
      
      const noteItemF = document.createElement("p");
      
      noteItemF.textContent = data[0].note_title;
      
      
      
      noteItemF.addEventListener('click', () => {
        
        
        
        const url = `noteEdit.html?note_title=${encodeURIComponent(data[0].note_title)}&created_at=${encodeURIComponent(data[0].created_at)}`;
        window.location.href = url;
      });
      
      
      notes.prepend(noteItemF);
      
      
      
      await wait(20);
      
      
      noteItemF.classList.add('show');
      
      noteItemF.style.marginBottom="10px";
      
      
      
      
      /*
      paragraphs.forEach((p, i) => {
        
        
        setTimeout(() => {
          
          p.classList.remove('show');
          
          
        }, (i + 1) * 150);
        
        
        
      });
      
      await wait(paragraphs.length * 150);
      */
    }
    
    
    
  }
  
  
  /**/
  
  
  
  
  /**/
  
}


if (document.body.dataset.page === "notes") {
  
  loadNotes(1);
  
  
} else if (document.body.dataset.page === "noteEdit") {
  
  
  const urlParams = new URLSearchParams(window.location.search);
  const note_title = urlParams.get('note_title');
  const created_at = urlParams.get('created_at');
  
  const note_title_p = document.getElementById("note_title_p");
  note_title_p.textContent = note_title;
  
  
  
  
  note_title_p.addEventListener('click', (e) => {
    note_title_p.contentEditable = "true";
    note_title_p.focus();
  });
  
  note_title_p.addEventListener('focusout', async (e) => {
    
    note_title_p.contentEditable = "false";
    
    
    
    
    ({ data, error } = await sb
      .from('notes')
      .update({ note_title: note_title_p.innerText })
      .eq('created_at', created_at));
    
    
    
    
  });
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  const editor = new EditorJS({
    
    tools: {
      
      header: Header,
      
      raw: RawTool,
      
      
      List: {
        class: EditorjsList,
        inlineToolbar: true,
        config: {
          defaultStyle: 'unordered'
        },
      },
      
      
      
      image: SimpleImage,
      
      embed: Embed,
      quote: Quote,
      
      
      
      //    inlineCode: InlineCode,
      
      
      
      table: Table,
      
      warning: Warning,
      underline: Underline,
      
      
      
      Marker: {
        class: Marker,
        shortcut: 'CMD+SHIFT+M',
      },
      
      
      
      
      delimiter: Delimiter,
      
      
      alert: Alert,
      
      
      toggle: {
        class: ToggleBlock,
        inlineToolbar: true,
      },
      
      
      
      
      
      
      
      
      noticeTune: NoticeTune,
      
      
    },
    tunes: ['noticeTune'],
    
    
    
    
    
    placeholder: 'write here!',
    
    onReady: async () => {
      
      
      
      
      
      
      ({ data, error } = await sb
        .from('notes')
        .select('note_json')
        .eq('created_at', created_at));
      
      
      
      await editor.render(data[0].note_json);
      
      
      
    }
    
    
    
    
  });
  
  
  
  
  // Assuming editor is already initialized
  const saveBtn = document.getElementById('saveBtn');
  
  saveBtn.addEventListener('click', async () => {
    
    let note_json_to_save = await editor.save();
    
    
    
    
    ({ data, error } = await sb
      .from('notes')
      .update({ note_json: note_json_to_save })
      .eq('created_at', created_at));
    
    
    
    
    
    
    
    
    
    
  });
  
  
  
}

else if (document.body.dataset.page === "profile") {
  
  loadProfile();
  
}



async function loadProfile() {
  
  const profileP = document.getElementById("profile");
  const profileInput = document.getElementById("profileInput");
  
  const nameP = document.getElementById("name");
  const emailP = document.getElementById("email");
  const genderP = document.getElementById("gender");
  const collegeP = document.getElementById("college");
  const batchP = document.getElementById("batch");
  
  
  ({ data, error } = await sb
    .from('userInfo')
    .select('name,profile,gender,college,batch')
    .eq('user_id', id));
  
  
  profileP.src = data[0].profile;
  
  nameP.innerText = data[0].name;
  
  
  profileP.onclick = () => profileInput.click();
  
  
  
  profileInput.onchange = async (e) => {
    let file = e.target.files[0];
    if (!file) return;
    
    let fileName = "profile" + "/" + Date.now() + "_" + file.name;
    ({ error } = await sb.storage.from("imgGallery").upload(fileName, file));
    ({ data } = sb.storage.from("imgGallery").getPublicUrl(fileName));
    
    profileP.src = data.publicUrl;
    
    ({ data, error } = await sb
      .from('userInfo')
      .update({ profile: data.publicUrl })
      .eq('user_id', id));
    
    
    
    
    
  };
  
  
  
  
  
  
  
  
  
  
  emailP.innerText = email;
  if (data[0].gender) {
    
    genderP.innerText = data[0].gender;
    
  } else {
    
    
    genderP.innerText = "gender";
    
    
  }
  if (data[0].college) {
    
    collegeP.innerText = data[0].college;
    
    
  } else {
    collegeP.innerText = "college";
  }
  if (data[0].batch) {
    
    batchP.innerText = data[0].batch;
    
    
  } else {
    batchP.innerText = "batch";
  }
  
  
  
  nameP.addEventListener('click', (e) => {
    nameP.contentEditable = "true";
    nameP.focus();
  });
  
  nameP.addEventListener('focusout', async (e) => {
    
    nameP.contentEditable = "false";
    
    ({ data, error } = await sb
      .from('userInfo')
      .update({ name: nameP.innerText })
      .eq('user_id', id));
    
    
    
  });
  
  
  genderP.addEventListener('click', (e) => {
    genderP.contentEditable = "true";
    genderP.focus();
  });
  
  genderP.addEventListener('focusout', async (e) => {
    
    genderP.contentEditable = "false";
    
    ({ data, error } = await sb
      .from('userInfo')
      .update({ gender: genderP.innerText })
      .eq('user_id', id));
    
    
  });
  
  
  collegeP.addEventListener('click', (e) => {
    collegeP.contentEditable = "true";
    collegeP.focus();
  });
  
  collegeP.addEventListener('focusout', async (e) => {
    
    collegeP.contentEditable = "false";
    
    ({ data, error } = await sb
      .from('userInfo')
      .update({ college: collegeP.innerText })
      .eq('user_id', id));
    
    
  });
  
  
  batchP.addEventListener('click', (e) => {
    batchP.contentEditable = "true";
    batchP.focus();
  });
  
  batchP.addEventListener('focusout', async (e) => {
    
    batchP.contentEditable = "false";
    ({ data, error } = await sb
      .from('userInfo')
      .update({ batch: batchP.innerText })
      .eq('user_id', id));
    
  });
  
  
  
  
  
  
}