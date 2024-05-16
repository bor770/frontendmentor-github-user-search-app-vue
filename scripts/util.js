const ERROR_MESSAGE = `Something went wrong!`;

const fetchRawData = async (url) => {
  let response;

  try {
    response = await fetch(url);
  } catch (error) {
    alert(ERROR_MESSAGE);
    return;
  }

  if (!response.ok) {
    return;
  }

  return response;
};

const getUserData = async (userName = `octocat`) => {
  const response = await fetchRawData(
    `https://api.github.com/users/${userName}`
  );

  if (!response) {
    return;
  }

  const responseData = await response.json();

  const getDateComponent = (option) =>
    new Date(responseData.created_at).toLocaleDateString(`en-US`, option);

  return {
    ...responseData,
    bio: responseData.bio || `This profile has no bio`,
    company: responseData.company || responseData.html_url,
    joinedAt: `Joined ${getDateComponent({
      day: `numeric`,
    })} ${getDateComponent({
      month: `short`,
    })} ${getDateComponent({ year: `numeric` })}`,
    name: responseData.name || responseData.login,
    noBio: !responseData.bio,
    twitter: responseData.twitter_username,
    website: responseData.blog,
  };
};

const getSvg = async (iconName) => {
  const response = await fetchRawData(`assets/images/icon-${iconName}.svg`);

  if (!response) {
    return;
  }

  return await response.text();
};

class Detail {
  constructor(fieldName, href) {
    this.fieldName = fieldName;
    this.href = href;
  }
}
