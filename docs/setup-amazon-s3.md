---
layout: doc
---

# Setting up Amazon S3 for Inbind

Use Amazon S3 when you want AWS-native storage, easy CloudFront integration, and full control over bucket access.

## What you will need

- An **S3 bucket**
- An **IAM user** (or role) with permissions to read and write to that bucket
- An **Access Key ID** and **Secret Access Key** for that IAM principal
- A **Public URL** for reading the published JSON (either a CloudFront URL or a direct S3 public URL)

## Step 1: Create an S3 bucket

1. Open AWS Console → S3
2. Create a General Purpose Bucket
3. Note the **Bucket name** and **AWS Region**

## Step 2: Create access credentials (IAM)

1. Open AWS Console → IAM → Users
2. Create an IAM user
3. On the **Set permissions** step choose **Attach policies directly**, click **Next** and finish the user creation (you will set the permissions themselves in a second)
4. Go to Policies and press **Create Policy**
    1. Choose JSON Policy editor and insert the snippet below, replacing *bucket-name* with the **Bucket Name**. After that give the policy a name (for example, *inbind-read-write*), and save the policy.

    ```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "ListObjectsInBucket",
                "Effect": "Allow",
                "Action": ["s3:ListBucket"],
                "Resource": ["arn:aws:s3:::bucket-name"]
            },
            {
                "Sid": "AllObjectActions",
                "Effect": "Allow",
                "Action": "s3:*Object",
                "Resource": ["arn:aws:s3:::bucket-name/*"]
            }
        ]
    }
    ```

5. Go back to the Users, click on the user you created before, click **Add permissions** → **Add Permissions** → **Attach policies directly**. Then find the policy you've just created, select it and click **Add Policy**. Now you have an IAM user that has access to your bucket!
6. Open the user you have created, click **Security Credentials** → **Create access key** → select **Other** → **Create access key**. Save the **Access Key** and **Secret Access Key** from the last step.

---

## Step 3: Make the content publicly readable (Public URL)

In AWS S3 open the bucket you created, and open the **Permissions** tab. Then:

1. **Block public access (bucket settings)** → Edit → Unselect all → Save changes
2. **Bucket policy** → Edit. Paste the following snippet, replacing *bucket-name* with your bucket name, then save changes.

```json
{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "PublicReadGetObject",
        "Effect": "Allow",
        "Principal": "*",
        "Action": "s3:GetObject",
        "Resource": "arn:aws:s3:::bucket-name/*"
      }
    ]
}
```

---

## Step 4: Fill the fields in Inbind

When creating the connection, enter the following:

- **Bucket Name:** Your bucket name from Step 1
- **Region:** Your bucket **AWS Region** (for example `eu-north-1`)
- **Access Key ID** and **Secret Access Key:** The credentials you created in Step 2
- **Public URL:** Leave empty
- **Custom Endpoint URL:** Leave empty

<NeedHelp />
