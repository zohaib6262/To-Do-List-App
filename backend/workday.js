(async () => {
  const { GoLogin } = await import("gologin");
  const GL = new GoLogin({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2ZmZjg5N2VhMWI4ZTRkYTI3YTAwYTIiLCJ0eXBlIjoiZGV2Iiwiand0aWQiOiI2ODAwMGY0NWY0ODY1NjhlM2FhYmEwNjkifQ.TvKz62ReOjTkVhh1h_QJFwRkeauhdW_wAZ_9AoCxSN0",
    profile_id: "680082742bfa722a9af612de",
  });

  const { wsUrl } = await GL.start();
  const browser = await puppeteerCore.connect({ browserWSEndpoint: wsUrl });

  const page = await browser.newPage();

  await page.goto(
    "https://workday.wd5.myworkdayjobs.com/en-US/Workday/job/Sr-Manager---Product-Management_JR-0094488",
    {
      waitUntil: "domcontentloaded",
      timeout: 0,
    }
  );

  const context = page.browserContext(); // Get the browser context
  await context.deleteCookie(); // Clear all cookies in that context

  try {
    console.log("Continue button");
    await page.waitForSelector('a[data-automation-id="continueButton"]', {
      timeout: 60000,
    });

    await page.click('a[data-automation-id="continueButton"]');
    console.log("After continue button");
  } catch (err) {
    if (
      page.url().trim() ===
      "https://workday.wd5.myworkdayjobs.com/en-US/Workday/job/Sr-Manager---Product-Management_JR-0094488"
    ) {
      // Click “Apply” buttons

      let signInVisible = false;

      while (!signInVisible) {
        try {
          await page.waitForSelector(
            'a[data-automation-id="adventureButton"]',
            { timeout: 3000 }
          );
          await page.click('a[data-automation-id="adventureButton"]');
          await page.waitForSelector('a[data-automation-id="applyManually"]', {
            timeout: 3000,
          });
          await page.click('a[data-automation-id="applyManually"]');
        } catch (err) {
          console.log("Manual apply step failed or already done, retrying...");
        }

        try {
          await page.waitForSelector(
            'button[data-automation-id="signInLink"]',
            { timeout: 3000 }
          );
          await page.click('button[data-automation-id="signInLink"]');
          signInVisible = true;
          console.log("Sign In button is visible now, exiting loop.");
        } catch (err) {
          console.log("Sign In button not visible yet, repeating loop...");
        }
      }
    }

    try {
      await signInForm();
      await loginForm();
    } catch (err) {
      console.log("🔁 Fallback: Direct login try kar rahe hain...");
      await loginForm();
    }
  }
  await mainProfile();
  //For Signin link
  async function waitForElementAndClick(selector, timeout = 30000) {
    try {
      await page.waitForSelector(selector, { timeout });
      await page.click(selector);
      return true;
    } catch (err) {
      return false;
    }
  }

  async function waitForElement(selector, timeout = 30000) {
    try {
      await page.waitForSelector(selector, { timeout });
      return true;
    } catch (err) {
      return false;
    }
  }

  async function signInForm() {
    const signInBtnSelector = 'button[data-automation-id="signInLink"]';
    const emailInputSelector =
      'input[data-automation-id="email"][id="input-9"]';

    // Keep trying to click signIn button until email input shows up
    for (let attempts = 0; attempts < 3; attempts++) {
      const clicked = await waitForElementAndClick(signInBtnSelector, 10000);
      if (clicked) {
        const found = await waitForElement(emailInputSelector, 5000);
        if (found) {
          console.log("✅ Email input mil gaya!");
          return;
        }
      }
      console.log(
        "🔁 Dobara try kar rahe hain signIn button click karne ka..."
      );
    }

    throw new Error("❌ Sign in form nahi khula, kuch garbar hai.");
  }

  async function loginForm() {
    try {
      await page.waitForSelector(
        'input[data-automation-id="email"][id="input-9"]'
      );
      await page.type(
        'input[data-automation-id="email"][id="input-9"]',
        "zohaibbinashraaf@gmail.com"
      );

      await page.waitForSelector(
        'input[data-automation-id="password"][id="input-10"]'
      );
      await page.type(
        'input[data-automation-id="password"][id="input-10"]',
        "Zaibi259!@#"
      );

      // Optional: Wait and click captcha wrapper if needed
      const captchaSelector = '[data-automation-id="noCaptchaWrapper"]';
      const captchaExists = await waitForElement(captchaSelector, 5000);
      if (captchaExists) {
        await page.click(captchaSelector);
      }

      // Submit/Login button logic
      const loginBtnSelector = 'button[data-automation-id="signInButton"]';
      const loginBtnExists = await waitForElement(loginBtnSelector, 5000);
      if (loginBtnExists) {
        await page.click(loginBtnSelector);
      }

      console.log("✅ Login form bhar diya!");
    } catch (err) {
      console.error("❌ Login form mein error: ", err.message);
    }
  }

  async function mainProfile() {
    let selector1 =
      '[data-automation-id="multiSelectContainer"] [tabindex="0"][id="source--source"]';
    try {
      await page.waitForSelector(selector1, { timeout: 10000 });
    } catch (err) {
      console.log("Element not found, reloading...");
      await page.reload({ waitUntil: "domcontentloaded" });
      await page.waitForSelector(selector1, { timeout: 120000 });
    }

    await page.click(selector1);

    await page.waitForSelector(
      "[id=menuItem-10e9752a0554100042459445f9d10000]"
    );
    await page.click("[id=menuItem-10e9752a0554100042459445f9d10000]");

    await page.waitForSelector("#menuItem-10e9752a05541000424594e0730a0002");
    await page.click("#menuItem-10e9752a05541000424594e0730a0002");

    await page.waitForSelector(
      'input[name="candidateIsPreviousWorker"][value="true"]'
    );
    await page.click('input[name="candidateIsPreviousWorker"][value="true"]');

    await page.waitForSelector('button[name="country"]');
    await page.click('button[name="country"]');

    await page.waitForSelector('[id="567ef1bd0cc84d4e83b98d0013008264"]');
    await page.click('[id="567ef1bd0cc84d4e83b98d0013008264"]');

    await page.waitForSelector('[id="name--legalName--firstName"]');
    await page.type('[id="name--legalName--firstName"]', "Zohaib");

    await page.waitForSelector('[id="name--legalName--middleName"]');
    await page.type('[id="name--legalName--middleName"]', "bin");

    await page.waitForSelector('[id="name--legalName--lastName"]');
    await page.type('[id="name--legalName--lastName"]', "Ashraf");

    await page.waitForSelector('[id="name--legalName--firstNameLocal"]');
    await page.type('[id="name--legalName--firstNameLocal"]', "Zaibi");

    await page.waitForSelector('[id="name--legalName--lastNameLocal"]');
    await page.type('[id="name--legalName--lastNameLocal"]', "Ashraf");

    await page.waitForSelector('[id="address--addressLine1"]');
    await page.click('[id="address--addressLine1"]', { clickCount: 3 });
    await page.keyboard.press("Backspace");
    await page.type(
      '[id="address--addressLine1"]',
      "G8,PARC Colony Islamabad."
    );

    await page.waitForSelector('[id="address--city"]');
    await page.click('[id="address--city"]', { clickCount: 3 });
    await page.keyboard.press("Backspace");
    await page.type('[id="address--city"]', "Islamabad");

    await page.waitForSelector('[id="address--postalCode"]');
    await page.click('[id="address--postalCode"]', { clickCount: 3 });
    await page.keyboard.press("Backspace");
    await page.type('[id="address--postalCode"]', "24435");

    await page.waitForSelector('[id="phoneNumber--phoneType"]', {
      timeout: 2000,
    });
    await page.click('[id="phoneNumber--phoneType"]');

    await page.waitForSelector('[id="93f104ac978147d19b6c08237c47dd93"]', {
      timeout: 2000,
    });
    await page.click('[id="93f104ac978147d19b6c08237c47dd93"]');

    await page.waitForSelector('[id="phoneNumber--countryPhoneCode"]', {
      timeout: 1000,
    });
    await page.click('[id="phoneNumber--countryPhoneCode"]');
    await page.waitForSelector('[data-automation-label="Pakistan (+92)"]');
    await page.click('[data-automation-label="Pakistan (+92)"]');

    await page.waitForSelector('[id="phoneNumber--phoneNumber"]', {
      timeout: 2000,
    });
    await page.click('[id="phoneNumber--phoneNumber"]', { clickCount: 3 });
    await page.keyboard.press("Backspace");
    await page.type('[id="phoneNumber--phoneNumber"]', "300 9731467");

    await page.waitForSelector(
      '[data-automation-id="pageFooter"] [data-automation-id="pageFooterNextButton"]'
    );
    await page.click(
      '[data-automation-id="pageFooter"] [data-automation-id="pageFooterNextButton"]'
    );

    //My Experience
    async function myExperience() {
      await page.waitForSelector('[name="jobTitle"]');
      await page.click('[name="jobTitle"]', { clickCount: 3 });
      await page.keyboard.press("Backspace");
      await page.type('[name="jobTitle"]', "Manager");

      await page.waitForSelector('[name="companyName"]', { timeout: 5000 });
      await page.click('[name="companyName"]', { clickCount: 3 });
      await page.keyboard.press("Backspace");
      await page.type('[name="companyName"]', "HBL");

      await page.waitForSelector('[name="location"]');
      await page.click('[name="location"]', { clickCount: 3 });
      await page.keyboard.press("Backspace");
      await page.type('[name="location"]', "Islamabad");

      // await page.waitForSelector('[name="currentlyWorkHere"]', {
      //   timeout: 5000,
      // });
      // await page.click('[name="currentlyWorkHere"]');

      await page.waitForSelector(
        '[data-automation-id="formField-startDate"] [data-automation-id="dateIcon"]',
        { timeout: 5000 }
      );
      await page.click(
        '[data-automation-id="formField-startDate"] [data-automation-id="dateIcon"]'
      );
      await page.waitForSelector(
        '[data-automation-id="monthPickerTileLabel"][title="October"]',
        {
          timeout: 5000,
        }
      );
      await page.click(
        '[data-automation-id="monthPickerTileLabel"][title="October"]'
      );

      await page.waitForSelector(
        '[data-automation-id="formField-endDate"] [aria-label="Calendar"]',
        { timeout: 5000 }
      );
      await page.click(
        '[data-automation-id="formField-endDate"] [aria-label="Calendar"]'
      );
      await page.waitForSelector(
        '[data-automation-id="monthPickerTileLabel"][title="October"]',
        {
          timeout: 5000,
        }
      );
      await page.click(
        '[data-automation-id="monthPickerTileLabel"][title="October"]'
      );
      await page.waitForSelector(
        '[data-automation-id="formField-roleDescription"]',
        { timeout: 50000 }
      );
      await page.click('[data-automation-id="formField-roleDescription"]', {
        clickCount: 3,
      });
      await page.keyboard.press("Backspace");
      await page.type(
        '[data-automation-id="formField-roleDescription"] textarea',
        "I was there as an HR."
      );
    }
    try {
      await page.waitForSelector(
        '[aria-labelledby="Work-Experience-1-panel"] button',
        { timeout: 30000 }
      );
      await page.click('[aria-labelledby="Work-Experience-1-panel"] button');
      await page.waitForSelector(
        '[aria-labelledby="Work-Experience-2-panel"] button',
        { timeout: 30000 }
      );
      await page.click('[aria-labelledby="Work-Experience-2-panel"] button');
      await page.waitForSelector(
        '[aria-labelledby="Work-Experience-3-panel"] button',
        { timeout: 30000 }
      );
      await page.click('[aria-labelledby="Work-Experience-3-panel"] button');
    } catch (err) {
      console.log("No there is no other education form");
    }
    try {
      await page.waitForSelector(
        '[data-automation-id="applyFlowMyExpPage"] [aria-labelledby="Work-Experience-section"] [aria-labelledby="Work-Experience-1-panel"]',
        { timeout: 15000 }
      );
      await myExperience();
    } catch (err) {
      await page.waitForSelector(
        '[aria-labelledby="Work-Experience-section"] [data-automation-id="add-button"]',
        { timeout: 15000 }
      );
      await page.click(
        '[aria-labelledby="Work-Experience-section"] [data-automation-id="add-button"]'
      );
      await myExperience();
    }

    //For Education

    async function educationForm() {
      //For Education
      await page.waitForSelector('[name="schoolName"]', {
        timeout: 4000,
      });
      await page.click('[name="schoolName"]', {
        clickCount: 3,
      });
      await page.keyboard.press("Backspace");
      await page.type('[name="schoolName"]', "PMAS University");

      await page.waitForSelector('[aria-label="Degree Select One Required"]');
      await page.click('[aria-label="Degree Select One Required"]');

      await page.waitForSelector(
        '[data-value="d1fb7a3023eb0161c996e142200f9502"]'
      );
      await page.click('[data-value="d1fb7a3023eb0161c996e142200f9502"]');

      await page.waitForSelector(
        '[data-automation-id="formField-fieldOfStudy"] [data-uxi-widget-type="selectinput"]',
        { timeout: 10000 }
      );
      await page.click(
        '[data-automation-id="formField-fieldOfStudy"] [data-uxi-widget-type="selectinput"]'
      );

      await page.waitForSelector(
        '[id="menuItem-98c56fe58a9b455a9684d76bcc60f4fb"]',
        {
          timeout: 12000,
        }
      );
      await page.click('[id="menuItem-98c56fe58a9b455a9684d76bcc60f4fb"]');
    }
    try {
      await page.waitForSelector(
        '[aria-labelledby="Education-1-panel"] button',
        { timeout: 30000 }
      );
      await page.click('[aria-labelledby="Education-1-panel"] button');
      await page.waitForSelector(
        '[aria-labelledby="Education-2-panel"] button',
        { timeout: 30000 }
      );
      await page.click('[aria-labelledby="Education-2-panel"] button');
      await page.waitForSelector(
        '[aria-labelledby="Education-3-panel"] button',
        { timeout: 30000 }
      );
      await page.click('[aria-labelledby="Education-3-panel"] button');
    } catch (err) {
      console.log("No more forms");
    }
    try {
      await page.waitForSelector(
        '[aria-labelledby="Education-section"] [data-automation-id="add-button"]',
        { timeout: 15000 }
      );

      await page.click(
        '[aria-labelledby="Education-section"] [data-automation-id="add-button"]'
      );
      await educationForm();
    } catch (err) {
      console.log("There is no education button");
    }

    //For skills
    await page.waitForSelector(
      '[data-automation-id="formField-skills"] [id="skills--skills"]',
      { timeout: 5000 }
    );
    await page.click(
      '[data-automation-id="formField-skills"] [id="skills--skills"]'
    );
    await page.type(
      '[data-automation-id="formField-skills"] [id="skills--skills"]',
      "Frontend Developer"
    );
    await page.keyboard.press("Enter");
    await page.waitForSelector('[id="menuItem-REMOTE_SKILL-1-44127"]', {
      timeout: 5000,
    });
    await page.click('[id="menuItem-REMOTE_SKILL-1-44127"]');

    //For Resume deletion
    try {
      await page.waitForSelector(
        '[data-automation-id="attachments-FileUpload"] button[data-automation-id="delete-file"]',
        {
          timeout: 3000,
        }
      );
      await page.click(
        '[data-automation-id="attachments-FileUpload"] button[data-automation-id="delete-file"]'
      );
      await page.waitForSelector(
        '[data-automation-id="attachments-FileUpload"] button[data-automation-id="delete-file"]',
        {
          timeout: 3000,
        }
      );
      await page.click(
        '[data-automation-id="attachments-FileUpload"] button[data-automation-id="delete-file"]'
      );
      await page.waitForSelector(
        '[data-automation-id="attachments-FileUpload"] button[data-automation-id="delete-file"]',
        {
          timeout: 3000,
        }
      );
      await page.click(
        '[data-automation-id="attachments-FileUpload"] button[data-automation-id="delete-file"]'
      );
      await page.waitForSelector(
        '[data-automation-id="attachments-FileUpload"] button[data-automation-id="delete-file"]',
        {
          timeout: 3000,
        }
      );
      await page.click(
        '[data-automation-id="attachments-FileUpload"] button[data-automation-id="delete-file"]'
      );
      await page.waitForSelector(
        '[data-automation-id="attachments-FileUpload"] button[data-automation-id="delete-file"]',
        {
          timeout: 3000,
        }
      );
      await page.click(
        '[data-automation-id="attachments-FileUpload"] button[data-automation-id="delete-file"]'
      );
      await page.waitForSelector(
        '[data-automation-id="attachments-FileUpload"] button[data-automation-id="delete-file"]',
        {
          timeout: 3000,
        }
      );
      await page.click(
        '[data-automation-id="attachments-FileUpload"] button[data-automation-id="delete-file"]'
      );
    } catch (err) {
      console.log("No more cvs");
    }
    try {
      const resumeFilePath = path.resolve(__dirname, "resume.pdf");

      await page.waitForSelector(
        'input[data-automation-id="file-upload-input-ref"]',
        { timeout: 4000 }
      );

      const uploadResume = await page.$(
        'input[data-automation-id="file-upload-input-ref"]'
      );

      await uploadResume.uploadFile(resumeFilePath);
    } catch (err) {
      console.log("There is no resume element");
    }

    //Websites sections
    async function websitesSectionForm() {
      await page.waitForSelector(
        '[data-automation-id="formField-url"] [name="url"]'
      );
      await page.click('[data-automation-id="formField-url"] [name="url"]', {
        clickCount: 3,
      });
      await page.keyboard.press("Backspace");
      await page.type(
        '[data-automation-id="formField-url"] [name="url"]',
        "https://my-portfolio-app-green.vercel.app/"
      );
    }

    try {
      await page.waitForSelector(
        '[data-automation-id="applyFlowMyExpPage"] [aria-labelledby="Websites-section"] [aria-labelledby="Websites-1-panel"]',
        { timeout: 6000 }
      );
      await websitesSectionForm();
    } catch (err) {
      await page.waitForSelector(
        '[aria-labelledby="Websites-section"] [data-automation-id="add-button"]',
        { timeout: 6000 }
      );
      await page.click(
        '[aria-labelledby="Websites-section"] [data-automation-id="add-button"]'
      );
      await websitesSectionForm();
    }

    try {
      await page.waitForSelector(
        '[aria-labelledby="Websites-2-panel"] button',
        { timeout: 40000 }
      );
      await page.click('[aria-labelledby="Websites-2-panel"] button');
      await page.waitForSelector(
        '[aria-labelledby="Websites-3-panel"] button',
        { timeout: 40000 }
      );
      await page.click('[aria-labelledby="Websites-3-panel"] button');
    } catch (err) {
      console.log("No more forms");
    }

    await page.waitForSelector(
      '[data-automation-id="pageFooter"] [data-automation-id="pageFooterNextButton"]',
      { timeout: 10000 }
    );
    await page.click(
      '[data-automation-id="pageFooter"] [data-automation-id="pageFooterNextButton"]'
    );
    //Now for application questions
    try {
      await page.waitForSelector(
        '[data-automation-id="formField-15cb5c09d59b10194f4f39c81b0c0000"] button',
        { timeout: 5000 }
      );
      await page.click(
        '[data-automation-id="formField-15cb5c09d59b10194f4f39c81b0c0000"] button'
      );
      await page.waitForSelector(
        '[data-value="d1a22c4ba6bf10237595123a6ed10000"]',
        { timeout: 5000 }
      );
      await page.click('[data-value="d1a22c4ba6bf10237595123a6ed10000"]');
    } catch (err) {
      console.log("No element");
    }

    try {
      await page.waitForSelector(
        '[data-automation-id="formField-15cb5c09d59b10194f4f3a62c5b70002"] button',
        { timeout: 5000 }
      );
      await page.click(
        '[data-automation-id="formField-15cb5c09d59b10194f4f3a62c5b70002"] button'
      );
      await page.waitForSelector(
        '[data-value="b53969fb4a8c014a414f73142507f456"]',
        { timeout: 5000 }
      );
      await page.click('[data-value="b53969fb4a8c014a414f73142507f456"]');
    } catch (err) {
      console.log("No element");
    }

    try {
      await page.waitForSelector(
        '[data-automation-id="formField-15cb5c09d59b10194f4f3afdc0fe0002"] button',
        { timeout: 5000 }
      );
      await page.click(
        '[data-automation-id="formField-15cb5c09d59b10194f4f3afdc0fe0002"] button'
      );
      await page.waitForSelector(
        '[data-value="6f943cc440601023751b46b0faa10001"]',
        { timeout: 5000 }
      );
      await page.click('[data-value="6f943cc440601023751b46b0faa10001"]');
    } catch (err) {
      console.log("No element");
    }
    try {
      await page.waitForSelector(
        '[data-automation-id="formField-15cb5c09d59b10194f4f3afdc0fe0008"] textarea',
        { timeout: 5000 }
      );
      await page.type(
        '[data-automation-id="formField-15cb5c09d59b10194f4f3afdc0fe0008"] textarea',
        "Hello,How are you?"
      );
    } catch (err) {
      console.log("No element");
    }

    try {
      await page.waitForSelector(
        '[data-automation-id="formField-15cb5c09d59b10194f4f3b9884540001"] button',
        { timeout: 5000 }
      );
      await page.click(
        '[data-automation-id="formField-15cb5c09d59b10194f4f3b9884540001"] button'
      );

      await page.waitForSelector(
        '[data-value="905f5f59e1d51002065c1872a8f80000"]',
        { timeout: 5000 }
      );
      await page.click('[data-value="905f5f59e1d51002065c1872a8f80000"]');
    } catch (err) {
      console.log("No element");
    }

    try {
      await page.waitForSelector(
        '[data-automation-id="formField-15cb5c09d59b10194f4f3b9884540004"] button',
        { timeout: 5000 }
      );
      await page.click(
        '[data-automation-id="formField-15cb5c09d59b10194f4f3b9884540004"] button'
      );

      await page.waitForSelector(
        '[data-value="9369868b555a1002065b75abf6540001"]',
        { timeout: 5000 }
      );
      await page.click('[data-value="9369868b555a1002065b75abf6540001"]');
    } catch (err) {
      console.log("No element");
    }

    try {
      await page.waitForSelector(
        '[data-automation-id="formField-15cb5c09d59b10194f4f3b9884540007"] button',
        { timeout: 5000 }
      );
      await page.click(
        '[data-automation-id="formField-15cb5c09d59b10194f4f3b9884540007"] button'
      );

      await page.waitForSelector(
        '[data-value="48a97f65e7fd100044fb5ed260b30000"]',
        { timeout: 5000 }
      );
      await page.click('[data-value="48a97f65e7fd100044fb5ed260b30000"]');
    } catch (err) {
      console.log("No element");
    }

    try {
      await page.waitForSelector(
        '[data-automation-id="formField-15cb5c09d59b10194f4f3c335b7b0002"] button',
        { timeout: 5000 }
      );
      await page.click(
        '[data-automation-id="formField-15cb5c09d59b10194f4f3c335b7b0002"] button'
      );

      await page.waitForSelector(
        '[data-value="7d2aaefa1c79100165c92dc05a600001"]',
        { timeout: 5000 }
      );
      await page.click('[data-value="7d2aaefa1c79100165c92dc05a600001"]');
    } catch (err) {
      console.log("No element");
    }

    try {
      await page.waitForSelector(
        '[data-automation-id="formField-15cb5c09d59b10194f4f3fd4879d0007"] button',
        { timeout: 5000 }
      );
      await page.click(
        '[data-automation-id="formField-15cb5c09d59b10194f4f3fd4879d0007"] button'
      );

      await page.waitForSelector(
        '[data-value="5386d02067ca100165c739f73dfe0001"]',
        { timeout: 5000 }
      );
      await page.click('[data-value="5386d02067ca100165c739f73dfe0001"]');
    } catch (err) {
      console.log("No element");
    }

    try {
      await page.waitForSelector(
        '[data-automation-id="formField-15cb5c09d59b10194f4f423fc9640001"] button',
        { timeout: 5000 }
      );
      await page.click(
        '[data-automation-id="formField-15cb5c09d59b10194f4f423fc9640001"] button'
      );

      await page.waitForSelector(
        '[data-value="3e534be7fbf6100165cd97a34e120000"]',
        { timeout: 5000 }
      );
      await page.click('[data-value="3e534be7fbf6100165cd97a34e120000"]');
    } catch (err) {
      console.log("No element");
    }

    try {
      await page.waitForSelector(
        '[data-automation-id="formField-15cb5c09d59b10194f4f42daa9b10006"] button',
        { timeout: 5000 }
      );
      await page.click(
        '[data-automation-id="formField-15cb5c09d59b10194f4f42daa9b10006"] button'
      );

      await page.waitForSelector(
        '[data-value="d30a8dd55e92100165cd8b7abe3b0000"]',
        { timeout: 5000 }
      );
      await page.click('[data-value="d30a8dd55e92100165cd8b7abe3b0000"]');
    } catch (err) {
      console.log("No element");
    }

    let usTwoYear = false;
    while (!usTwoYear) {
      try {
        await page.waitForSelector(
          '[data-automation-id="formField-15cb5c09d59b10194f4f43759fd20005"] button',
          { timeout: 5000 }
        );
        await page.click(
          '[data-automation-id="formField-15cb5c09d59b10194f4f43759fd20005"] button'
        );

        await page.waitForSelector(
          '[data-value="7d2aaefa1c79100165c92e5a0a660000"]',
          { timeout: 4000 }
        );
        await page.click('[data-value="7d2aaefa1c79100165c92e5a0a660000"]');
        usTwoYear = true;
      } catch (err) {
        usTwoYear = false;
        console.log("No element");
      }
    }

    try {
      await page.waitForSelector(
        '[data-automation-id="formField-15cb5c09d59b10194f4f4410a73e0001"] button',
        { timeout: 5000 }
      );
      await page.click(
        '[data-automation-id="formField-15cb5c09d59b10194f4f4410a73e0001"] button'
      );

      await page.waitForSelector(
        '[data-value="3e534be7fbf6100165cd97a34e100000"]',
        { timeout: 5000 }
      );
      await page.click('[data-value="3e534be7fbf6100165cd97a34e100000"]');
    } catch (err) {
      console.log("No element");
    }

    try {
      await page.waitForSelector(
        '[data-automation-id="formField-15cb5c09d59b10194f4f45466cf80000"] button',
        { timeout: 5000 }
      );
      await page.click(
        '[data-automation-id="formField-15cb5c09d59b10194f4f45466cf80000"] button'
      );

      await page.waitForSelector(
        '[data-value="b53969fb4a8c01d6908872142507e756"]',
        { timeout: 5000 }
      );
      await page.click('[data-value="b53969fb4a8c01d6908872142507e756"]');
    } catch (err) {
      console.log("No element");
    }

    try {
      await page.waitForSelector(
        '[data-automation-id="formField-15cb5c09d59b10194f4f45466cf80004"] button',
        { timeout: 5000 }
      );
      await page.click(
        '[data-automation-id="formField-15cb5c09d59b10194f4f45466cf80004"] button'
      );

      await page.waitForSelector(
        '[data-value="b53969fb4a8c012e232a72142507e156"]',
        { timeout: 5000 }
      );
      await page.click('[data-value="b53969fb4a8c012e232a72142507e156"]');
    } catch (err) {
      console.log("No element");
    }

    try {
      await page.waitForSelector(
        '[data-automation-id="formField-15cb5c09d59b10194f4f45e1584d0000"] button',
        { timeout: 5000 }
      );
      await page.click(
        '[data-automation-id="formField-15cb5c09d59b10194f4f45e1584d0000"] button'
      );

      await page.waitForSelector(
        '[data-value="7d2aaefa1c79100165c92dc05a5f0001"]',
        { timeout: 5000 }
      );
      await page.click('[data-value="7d2aaefa1c79100165c92dc05a5f0001"]');
    } catch (err) {
      console.log("No element");
    }

    try {
      await page.waitForSelector(
        '[data-automation-id="pageFooter"] button[data-automation-id="pageFooterNextButton"]',
        { timeout: 5000 }
      );
      await page.click(
        '[data-automation-id="pageFooter"] button[data-automation-id="pageFooterNextButton"]'
      );
    } catch (err) {
      console.log("No element");
    }

    //Voluntary Disclosures
    try {
      await page.waitForSelector(
        '[data-automation-id="formField-acceptTermsAndAgreements"] input[aria-required="true"]',
        { timeout: 5000 }
      );
      await page.click(
        '[data-automation-id="formField-acceptTermsAndAgreements"] input[aria-required="true"]'
      );
    } catch (err) {
      console.log("No element");
    }

    try {
      await page.waitForSelector(
        '[data-automation-id="pageFooter"] button[data-automation-id="pageFooterNextButton"]',
        { timeout: 5000 }
      );
      await page.click(
        '[data-automation-id="pageFooter"] button[data-automation-id="pageFooterNextButton"]'
      );
    } catch (err) {
      console.log("No element");
    }

    //For Submittion
    try {
      await page.waitForSelector(
        '[data-automation-id="pageFooter"] button[data-automation-id="pageFooterNextButton"]',
        { timeout: 5000 }
      );
      await page.click(
        '[data-automation-id="pageFooter"] button[data-automation-id="pageFooterNextButton"]'
      );
    } catch (err) {
      console.log("No element");
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 30000));
  console.log(" Proceeding to close browser...");
  await page.close();
  await browser.close();
  await GL.stop();
})();