/*
 Copyright (c) 2011-2015, salesforce.com, inc. All rights reserved.
 
 Redistribution and use of this software in source and binary forms, with or without modification,
 are permitted provided that the following conditions are met:
 * Redistributions of source code must retain the above copyright notice, this list of conditions
 and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of
 conditions and the following disclaimer in the documentation and/or other materials provided
 with the distribution.
 * Neither the name of salesforce.com, inc. nor the names of its contributors may be used to
 endorse or promote products derived from this software without specific prior written
 permission of salesforce.com, inc.
 
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR
 IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY
 WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

#import "AppDelegate.h"
#import "InitialViewController.h"
#if TARGET_OS_TV
#import <ReactTV/RCTRootView.h>
#else
#import <React/RCTRootView.h>
#endif
#import <SalesforceSDKCore/SFPushNotificationManager.h>
#import <SalesforceSDKCore/SFDefaultUserManagementViewController.h>
#import <SalesforceSDKCore/SalesforceSDKManager.h>
#import <SalesforceSDKCore/SFUserAccountManager.h>
#import <SalesforceSDKCore/SFLogger.h>
#import <SmartStore/SalesforceSDKManagerWithSmartStore.h>
#import <SalesforceRestAPI/SalesforceRestAPI.h>

#include "TargetConditionals.h"

// Fill these in when creating a new Connected Application on Force.com
static NSString * const RemoteAccessConsumerKey = @"3MVG9Iu66FKeHhINkB1l7xt7kR8czFcCTUhgoA8Ol2Ltf1eYHOU4SqQRSEitYFDUpqRWcoQ2.dBv_a1Dyu5xa";
static NSString * const OAuthRedirectURI        = @"testsfdc:///mobilesdk/detect/oauth/done";

@implementation AppDelegate

- (id)init
{
    self = [super init];
    if (self) {
        [SFLogger setLogLevel:SFLogLevelDebug];

        [SalesforceSDKManager sharedManager].useSnapshotView = NO;
        
        // Need to use SalesforceSDKManagerWithSmartStore when using smartstore

        [SalesforceSDKManager setInstanceClass:[SalesforceSDKManagerWithSmartStore class]];
/*
        [SalesforceSDKManager sharedManager].connectedAppId = RemoteAccessConsumerKey;
        [SalesforceSDKManager sharedManager].connectedAppCallbackUri = OAuthRedirectURI;
        [SalesforceSDKManager sharedManager].authScopes = @[ @"web", @"api" ];
        __weak AppDelegate *weakSelf = self;
        [SalesforceSDKManager sharedManager].postLaunchAction = ^(SFSDKLaunchAction launchActionList) {
            //
            // If you wish to register for push notifications, uncomment the line below.  Note that,
            // if you want to receive push notifications from Salesforce, you will also need to
            // implement the application:didRegisterForRemoteNotificationsWithDeviceToken: method (below).
            //
            //[[SFPushNotificationManager sharedInstance] registerForRemoteNotifications];
            //
            [weakSelf log:SFLogLevelInfo format:@"Post-launch: launch actions taken: %@", [SalesforceSDKManager launchActionsStringRepresentation:launchActionList]];
            [weakSelf setupRootViewController];
        };
        [SalesforceSDKManager sharedManager].launchErrorAction = ^(NSError *error, SFSDKLaunchAction launchActionList) {
            [weakSelf log:SFLogLevelError format:@"Error during SDK launch: %@", [error localizedDescription]];
            [weakSelf initializeAppViewState];
            [[SalesforceSDKManager sharedManager] launch];
        };
        [SalesforceSDKManager sharedManager].postLogoutAction = ^{
            [weakSelf handleSdkManagerLogout];
        };
        [SalesforceSDKManager sharedManager].switchUserAction = ^(SFUserAccount *fromUser, SFUserAccount *toUser) {
            [weakSelf handleUserSwitch:fromUser toUser:toUser];
        };
        
   */
        
    }
    
    return self;
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    self.launchOptions = launchOptions;
    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
//    [self initializeAppViewState];
    
    //If you wish to customize the color, textcolor, font and fontsize of the navigation bar uncomment the
    //code below.
    //
    //SFLoginViewController *loginViewController = [SFLoginViewController sharedInstance];
    // Set primary color to different color to style the navigation header
    //loginViewController.navBarColor = [UIColor colorWithRed:0.051 green:0.765 blue:0.733 alpha:1.0];
    //loginViewController.navBarFont = [UIFont fontWithName:@"Helvetica" size:16.0];
    //loginViewController.navBarTextColor = [UIColor blackColor];
    //
    
    //
    // For now, use SOAP authentication to log in (requires security token)
    // (See https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_concepts_security.htm)
    //
    // TODO: Build a proper authentication flow.
    

    
//    NSString *username = @"kapil.gowru+dreamhouzz@salesforce.com";
//    NSString *password = @"Pistons1";
//    NSString *securityToken = @"3yoBfVibfjgRWtwp9G00DkuId";
    
    NSString *username = @"apple@touch.org";
    NSString *password = @"123456";
    NSString *securityToken = @"8mVdqDwYeBBGbHjQUKfLxj4dj";

    
    NSString *requestDataString = [NSString stringWithFormat:@"\
                                   <env:Envelope xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" \
                                                       xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" \
                                                       xmlns:env=\"http://schemas.xmlsoap.org/soap/envelope/\"> \
                                   <env:Body>\
                                   <n1:login xmlns:n1=\"urn:partner.soap.sforce.com\">\
                                   <n1:username>%@</n1:username>\
                                   <n1:password>%@%@</n1:password>\
                                   </n1:login>\
                                   </env:Body>\
                                   </env:Envelope>",
                                   username,password,securityToken];
    
    NSURL *url = [NSURL URLWithString:@"https://login.salesforce.com/services/Soap/u/36.0"];
    
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    request.HTTPMethod = @"POST";
    request.HTTPBody = [NSData dataWithBytes:[requestDataString cStringUsingEncoding:NSUTF8StringEncoding] length:[requestDataString lengthOfBytesUsingEncoding:NSUTF8StringEncoding]];
    
    [request setValue:@"text/xml" forHTTPHeaderField:@"Content-Type"];
    [request setValue:@"login" forHTTPHeaderField:@"SOAPAction"];
    
    [NSURLConnection sendAsynchronousRequest:request
                                       queue:[NSOperationQueue new]
                           completionHandler:^(NSURLResponse *response, NSData *data,  NSError *error) {
                               
                               if(error) {
                                   NSLog(@"Authentication error: %@",[error description]);
                                   return;
                               }
                               
                               NSString *responseData = [[NSString alloc] initWithBytes:data.bytes length:data.length encoding:NSUTF8StringEncoding];
                               
//                               NSLog(reponseDaresponseDatata);
                               // Extract access token

                               NSRange range1 = [responseData rangeOfString:@"<sessionId>"];
                               NSRange range2 = [responseData rangeOfString:@"</sessionId>"];
                               if(range1.location == NSNotFound || range2.location == NSNotFound) {
                                   NSLog(@"Authentication error: %@",responseData);
                                   return;
                               }
                               
                               NSString *accessToken = [responseData substringWithRange:NSMakeRange(range1.location + range1.length, range2.location - (range1.location + range1.length))];
                               
                               SFUserAccount *user = [SFUserAccount new];
                               user.credentials = [[SFOAuthCredentials alloc] initWithIdentifier:@"dreamhouse"
                                                                                        clientId:RemoteAccessConsumerKey
                                                                                       encrypted:NO
                                                                                     storageType:SFOAuthCredentialsStorageTypeNone];
                               
                               user.credentials.accessToken = accessToken;
                               
//                               user.credentials.instanceUrl = [NSURL URLWithString:@"https://na30.salesforce.com/"];
                               user.credentials.instanceUrl = [NSURL URLWithString:@"https://na45.salesforce.com/"];
                               
                               SFOAuthCoordinator *newRestApiCoord = [[SFOAuthCoordinator alloc] initWithCredentials:user.credentials];
                               [SFUserAccountManager sharedInstance].currentUser = user;
                               
                               
                               [[SFRestAPI sharedInstance] setCoordinator:newRestApiCoord];

                               [self performSelectorOnMainThread:@selector(setupRootViewController)
                                                      withObject:nil
                                                   waitUntilDone:NO];
                               
                           }];
    
    
    return YES;
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
    //
    // Uncomment the code below to register your device token with the push notification manager
    //
    //[[SFPushNotificationManager sharedInstance] didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
    //if ([SFUserAccountManager sharedInstance].currentUser.credentials.accessToken != nil) {
    //    [[SFPushNotificationManager sharedInstance] registerForSalesforceNotifications];
    //}
    //
}

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
    // Respond to any push notification registration errors here.
}

#pragma mark - Private methods

- (void)initializeAppViewState
{
    if (![NSThread isMainThread]) {
        dispatch_async(dispatch_get_main_queue(), ^{
            [self initializeAppViewState];
        });
        return;
    }

    self.window.rootViewController = [[InitialViewController alloc] initWithNibName:nil bundle:nil];
    [self.window makeKeyAndVisible];
}

- (void)setupRootViewController
{
    /**
     * Loading JavaScript code - uncomment the one you want.
     *
     * OPTION 1
     * Load from development server. Start the server from the repository root:
     *
     * $ ./rundevserver.sh
     *
     * To run on device, change `localhost` to the IP address of your computer
     * (you can get this by typing `ifconfig` into the terminal and selecting the
     * `inet` value under `en0:`) and make sure your computer and iOS device are
     * on the same Wi-Fi network.
     */

#if (TARGET_IPHONE_SIMULATOR)
    
#if TARGET_OS_TV
     NSURL *jsCodeLocation = [NSURL URLWithString:[NSString stringWithFormat:@"http://localhost:%@/index.ios.bundle?platform=ios&dev=true&appletv=true",@"8081"]];
    
#else
    NSURL *jsCodeLocation = [NSURL URLWithString:[NSString stringWithFormat:@"http://localhost:%@/index.ios.bundle?platform=ios&dev=true",@"8081"]];
#endif
    
#else

   // NSURL *jsCodeLocation = [NSURL URLWithString:[NSString stringWithFormat:@"http://kapil-gowru-ltm.internal.salesforce.com:%@/index.ios.bundle?platform=ios&appletv=true",@"8081"]];

    NSURL *jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];

#endif
 
    [self setupReactRootView:jsCodeLocation];
    
    /**
     * OPTION 2
     * Load from pre-bundled file on disk. To re-generate the static bundle,
     * start the server from the repository root:
     *
     * $ ./rundevserver.sh
     *
     * Run the curl command and add the output to your main Xcode build target:
     *
     * $ curl http://localhost:8081/index.ios.bundle -o main.jsbundle
     */
    // [self setupReactRootView:[[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"]];
}

- (void)setupReactRootView:(NSURL*)jsCodeLocation
{
    RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                        moduleName:@"dreamhouse"
                                                 initialProperties:nil
                                                     launchOptions:self.launchOptions];
    
    UIViewController *rootViewController = [[UIViewController alloc] init];
    rootViewController.view = rootView;
    self.window.rootViewController = rootViewController;
    [self.window makeKeyAndVisible];
}

- (void)resetViewState:(void (^)(void))postResetBlock
{
    if ([self.window.rootViewController presentedViewController]) {
        [self.window.rootViewController dismissViewControllerAnimated:NO completion:^{
            postResetBlock();
        }];
    } else {
        postResetBlock();
    }
}

- (void)handleSdkManagerLogout
{
    [self log:SFLogLevelDebug msg:@"SFAuthenticationManager logged out.  Resetting app."];
    [self resetViewState:^{
        [self initializeAppViewState];
        
        // Multi-user pattern:
        // - If there are two or more existing accounts after logout, let the user choose the account
        //   to switch to.
        // - If there is one existing account, automatically switch to that account.
        // - If there are no further authenticated accounts, present the login screen.
        //
        // Alternatively, you could just go straight to re-initializing your app state, if you know
        // your app does not support multiple accounts.  The logic below will work either way.
        NSArray *allAccounts = [SFUserAccountManager sharedInstance].allUserAccounts;
        if ([allAccounts count] > 1) {
            SFDefaultUserManagementViewController *userSwitchVc = [[SFDefaultUserManagementViewController alloc] initWithCompletionBlock:^(SFUserManagementAction action) {
                [self.window.rootViewController dismissViewControllerAnimated:YES completion:NULL];
            }];
            [self.window.rootViewController presentViewController:userSwitchVc animated:YES completion:NULL];
        } else {
            if ([allAccounts count] == 1) {
                [SFUserAccountManager sharedInstance].currentUser = ([SFUserAccountManager sharedInstance].allUserAccounts)[0];
            }
            
            [[SalesforceSDKManager sharedManager] launch];
        }
    }];
}

- (void)handleUserSwitch:(SFUserAccount *)fromUser
                  toUser:(SFUserAccount *)toUser
{
    [self log:SFLogLevelDebug format:@"SFUserAccountManager changed from user %@ to %@.  Resetting app.",
     fromUser.userName, toUser.userName];
    [self resetViewState:^{
        [self initializeAppViewState];
        [[SalesforceSDKManager sharedManager] launch];
    }];
}

@end
