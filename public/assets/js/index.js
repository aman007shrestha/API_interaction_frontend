const containerSelector = document.getElementById('container');
const blogItemSelector = containerSelector.querySelector('.blogs-item');

let blogs = [];
window.onload = async () => {
  const response = await fetch(
    'https://apiinteractionbackend.aman007shrestha.repl.co/api/blogs',
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    }
  );
  blogs = await response.json();
  displayBlogs(blogs.reverse());
};
function displayBlogs(blogs) {
  let blogsContents = blogs.map((blog) => {
    return `<article class="blog-item">
    <h4>${blog.title}</h4>
    <p>${blog.content}</p>
    </article>
    `;
  });
  blogsContents = blogsContents.join('');
  blogItemSelector.innerHTML = blogsContents;
}
// Form Submit
const formSelector = containerSelector.querySelector('.form');
const submitSelector = containerSelector.querySelector('.form__submit');
let data = {};

submitSelector.addEventListener('click', async (e) => {
  e.preventDefault();
  const titleSelector = document.getElementById('title');
  let title = titleSelector.value;
  const contentSelector = document.getElementById('content');
  let content = contentSelector.value;
  let rawData = { title, content };
  data = JSON.stringify(rawData);
  console.log(data);
  const response = await fetch(
    'https://apiinteractionbackend.aman007shrestha.repl.co/api/blogs',
    {
      method: 'POST',
      body: data,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
  );
  contentSelector.value = '';
  titleSelector.value = '';
  blogs = [...blogs, rawData];
  displayBlogs(blogs);
});
