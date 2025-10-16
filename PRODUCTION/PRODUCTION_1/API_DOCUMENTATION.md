# WorkFree API Documentation

Complete API reference for WorkFree platform.

---

## 🔐 Authentication

All authenticated endpoints require a valid session cookie.

### Register

**POST** `/register`

Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "fullName": "John Doe"
}
```

**Response:**
- `302 Redirect` to `/dashboard` on success
- `400 Bad Request` with error message on failure

---

### Login

**POST** `/login`

Authenticate a user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:**
- `302 Redirect` to `/dashboard` on success
- `400 Bad Request` with error message on failure

---

### Logout

**POST** `/logout`

End user session.

**Response:**
- `302 Redirect` to `/`

---

## 📚 Quests

### List Quests

**GET** `/quests`

Get all published quests with optional filters.

**Query Parameters:**
- `category` (optional): Filter by category
- `difficulty` (optional): Filter by difficulty (beginner, intermediate, advanced)

**Response:**
```json
{
  "quests": [
    {
      "id": "quest_123",
      "title": "Introduction to VR Training",
      "description": "Learn the basics...",
      "difficulty": "beginner",
      "category": "Onboarding",
      "durationMinutes": 15,
      "xpReward": 100,
      "userProgress": {
        "status": "in_progress",
        "progressPercentage": 50
      }
    }
  ]
}
```

---

### Get Quest Details

**GET** `/quests/[id]`

Get detailed information about a specific quest.

**Response:**
```json
{
  "quest": {
    "id": "quest_123",
    "title": "Introduction to VR Training",
    "description": "Learn the basics...",
    "difficulty": "beginner",
    "category": "Onboarding",
    "durationMinutes": 15,
    "xpReward": 100,
    "content": {
      "steps": [
        {
          "title": "Welcome",
          "content": "<p>Welcome to...</p>"
        }
      ]
    }
  },
  "progress": {
    "status": "in_progress",
    "currentStep": 0,
    "progressPercentage": 0
  }
}
```

---

### Start Quest

**POST** `/quests/[id]?/start`

Start a new quest.

**Response:**
- `200 OK` with `{ success: true }`
- `400 Bad Request` if quest already started

---

### Update Progress

**POST** `/quests/[id]?/updateProgress`

Update quest progress.

**Request Body:**
```json
{
  "currentStep": 1,
  "progressPercentage": 50
}
```

**Response:**
- `200 OK` with `{ success: true }`

---

### Complete Quest

**POST** `/quests/[id]?/complete`

Mark quest as completed.

**Response:**
- `302 Redirect` to `/dashboard`

---

## 🏆 Achievements

### List Achievements

**GET** `/achievements`

Get all achievements with unlock status.

**Response:**
```json
{
  "achievements": [
    {
      "id": "achievement_123",
      "name": "First Steps",
      "description": "Complete your first quest",
      "rarity": "common",
      "xpReward": 50,
      "unlocked": true,
      "unlockedAt": "2025-01-15T10:30:00Z",
      "progress": 100
    }
  ],
  "stats": {
    "total": 8,
    "unlocked": 3,
    "percentage": 37
  }
}
```

---

## 📊 Leaderboard

### Get Leaderboard

**GET** `/leaderboard`

Get global leaderboard rankings.

**Response:**
```json
{
  "leaderboard": [
    {
      "userId": "user_123",
      "email": "user@example.com",
      "fullName": "John Doe",
      "rank": 1,
      "totalXP": 1500,
      "completedQuests": 15,
      "averageScore": 95,
      "totalTimeSpent": 3600,
      "isCurrentUser": false
    }
  ],
  "currentUser": {
    "rank": 5,
    "totalXP": 800,
    "completedQuests": 8
  }
}
```

---

## 👤 User Profile

### Get Profile

**GET** `/profile`

Get current user's profile.

**Response:**
```json
{
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "fullName": "John Doe",
    "role": "user",
    "subscriptionTier": "free",
    "emailVerified": true,
    "createdAt": "2025-01-01T00:00:00Z"
  },
  "stats": {
    "totalXP": 800,
    "completedQuests": 8,
    "achievements": 3
  }
}
```

---

### Update Profile

**POST** `/profile?/updateProfile`

Update user profile information.

**Request Body:**
```json
{
  "fullName": "John Smith"
}
```

**Response:**
- `200 OK` with `{ success: true, message: "Profile updated" }`

---

## 💳 Payments

### Get Pricing

**GET** `/pricing`

Get all subscription plans.

**Response:**
```json
{
  "plans": {
    "free": {
      "name": "Free",
      "price": 0,
      "features": ["5 quests per month", "..."]
    },
    "starter": {
      "name": "Starter",
      "price": 49,
      "priceId": "price_123",
      "features": ["Unlimited quests", "..."]
    }
  },
  "currentTier": "free"
}
```

---

### Create Checkout Session

**POST** `/pricing?/checkout`

Create Stripe checkout session.

**Request Body:**
```json
{
  "tier": "starter"
}
```

**Response:**
- `303 Redirect` to Stripe checkout

---

### Manage Subscription

**POST** `/pricing/manage?/portal`

Redirect to Stripe customer portal.

**Response:**
- `303 Redirect` to Stripe portal

---

## 🔧 Admin API

All admin endpoints require `role: 'admin'`.

### List All Quests (Admin)

**GET** `/admin/quests`

Get all quests including unpublished.

**Response:**
```json
{
  "quests": [
    {
      "quest": {
        "id": "quest_123",
        "title": "...",
        "isPublished": true
      },
      "enrollments": 25
    }
  ]
}
```

---

### Create Quest (Admin)

**POST** `/admin/quests/new`

Create a new quest.

**Request Body:**
```json
{
  "title": "New Quest",
  "description": "Description...",
  "difficulty": "beginner",
  "category": "Category",
  "durationMinutes": 30,
  "xpReward": 100,
  "steps": [
    {
      "title": "Step 1",
      "content": "<p>Content...</p>"
    }
  ]
}
```

**Response:**
- `302 Redirect` to `/admin/quests`

---

### Update Quest (Admin)

**POST** `/admin/quests/[id]/edit`

Update existing quest.

**Request Body:** Same as create quest

**Response:**
- `302 Redirect` to `/admin/quests`

---

### Delete Quest (Admin)

**POST** `/admin/quests?/delete`

Delete a quest (only if no enrollments).

**Request Body:**
```json
{
  "questId": "quest_123"
}
```

**Response:**
- `200 OK` with `{ success: true }`
- `400 Bad Request` if quest has enrollments

---

### Toggle Publish (Admin)

**POST** `/admin/quests?/togglePublish`

Publish or unpublish a quest.

**Request Body:**
```json
{
  "questId": "quest_123",
  "isPublished": "true"
}
```

**Response:**
- `200 OK` with `{ success: true }`

---

### List Users (Admin)

**GET** `/admin/users`

Get all users with stats.

**Query Parameters:**
- `search` (optional): Search by email or name
- `role` (optional): Filter by role
- `tier` (optional): Filter by subscription tier

**Response:**
```json
{
  "users": [
    {
      "id": "user_123",
      "email": "user@example.com",
      "fullName": "John Doe",
      "role": "user",
      "subscriptionTier": "free",
      "stats": {
        "totalQuests": 10,
        "completedQuests": 8,
        "achievements": 3
      }
    }
  ]
}
```

---

### Update User Role (Admin)

**POST** `/admin/users?/updateRole`

Update user's role.

**Request Body:**
```json
{
  "userId": "user_123",
  "role": "premium"
}
```

**Response:**
- `200 OK` with `{ success: true }`

---

## 🔔 Webhooks

### Stripe Webhook

**POST** `/api/webhooks/stripe`

Handle Stripe webhook events.

**Headers:**
- `stripe-signature`: Webhook signature

**Events Handled:**
- `checkout.session.completed`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_failed`

**Response:**
- `200 OK` with `{ received: true }`

---

## 📧 Email Verification

### Verify Email

**GET** `/verify-email?token=TOKEN`

Verify user's email address.

**Response:**
```json
{
  "success": true,
  "message": "Email verified successfully!"
}
```

---

## 🔒 Rate Limiting

All endpoints are rate-limited:
- **Authentication:** 5 requests per minute
- **API endpoints:** 100 requests per minute
- **Webhooks:** No limit

---

## 📝 Error Responses

All errors follow this format:

```json
{
  "message": "Error description",
  "code": "ERROR_CODE"
}
```

**Common Error Codes:**
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

**API Version:** 1.0  
**Last Updated:** 2025-01-15

