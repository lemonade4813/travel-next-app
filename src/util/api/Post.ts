type PostRequestOptions = {
    url: string;
    body: object;
    successMessage: string;
    errorMessage: string;
    redirectPath?: string;
  };
  
  export const Post = async ({
    url,
    body,
    successMessage,
    errorMessage,
    redirectPath,
  }: PostRequestOptions) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        throw new Error(errorMessage);
      }
  
      alert(successMessage);
  
      if (redirectPath) {
        location.href = redirectPath;
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e);
        alert(e.message);
      }
    }
  };